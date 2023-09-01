import axios, { AxiosResponse } from 'axios';
import { throttle } from '../utils/throttle';
import { fileCacheGet, fileCachePut } from '../utils/fileCache';
import { putFileText } from '../utils/fs';
import { jsonSerialize } from '../utils/json';

type ApiResponse<TData extends StocksApiResponse | EtfsApiResponse | MutualFundApiResponse> = {
    data: TData;
    message: string | null;
    status: {
        bCodeMessage: string | null;
        developerMessage: string | null;
        rCode: number;
    };
};

type Table<T> = {
    asOf: string | null;
    headers?: T;
    rows?: Array<T>;
};

type EtfsApiResponse = {
    dataAsOf: string | null;
    data: Table<Etf>;
};

type MutualFundApiResponse = {
    filters: null;
    records: {
        data: Table<MutualFund>;
        limit: number;
        offset: number;
        totalrecords: number;
    };
};

type StocksApiResponse = {
    asOf: string | null;
    headers: Stock;
    rows: Array<Stock>;
};

export type Etf = {
    companyName: string;
    deltaIndicator: 'up' | 'down';
    lastSalePrice: string;
    netChange: string;
    oneYearPercentage: string;
    percentageChange: string;
    symbol: string;
};

export type MutualFund = {
    companyName: string;
    deltaIndicator: 'up' | 'down';
    fundType: string;
    lastSalePrice: string;
    netChange: string;
    percentageChange: string;
    symbol: string;
};

export type Stock = {
    country: string;
    industry: string;
    ipoyear: string;
    lastsale: string;
    marketCap: string;
    name: string;
    netchange: string;
    pctchange: string;
    sector: string;
    symbol: string;
    url: string;
    volume: string;
};

export type NasdaqAssetType = 'etf' | 'stocks' | 'mutualfunds';

const dailyExpirationCacheKey = (key: string) => `${new Date().toISOString().slice(0, 10)}:${key}`;
const monthlyExpirationCacheKey = (key: string) => `${new Date().toISOString().slice(0, 7)}:${key}`;

export async function fetchNasdaqAssets<TData extends StocksApiResponse | EtfsApiResponse | MutualFundApiResponse>(
    type: NasdaqAssetType,
    offset: number = 0,
    limit: number | undefined = undefined
): Promise<ApiResponse<TData> | undefined> {
    const apiParams = new URLSearchParams({
        download: 'true'
    });

    if (type === 'mutualfunds') {
        apiParams.append('fundtype', 'MF');
    }

    if (limit !== undefined) {
        apiParams.append('limit', limit.toString());
    }

    if (offset !== 0) {
        apiParams.append('offset', offset.toString());
    }

    const apiUrl = `https://api.nasdaq.com/api/screener/${type}?${apiParams.toString()}`;
    const expireDailyCacheKey =
        type === 'mutualfunds' ? monthlyExpirationCacheKey(apiUrl) : dailyExpirationCacheKey(apiUrl);

    let apiData: ApiResponse<TData>;

    console.log(`Looking for cache of '${type}' data...`);

    try {
        apiData = await fileCacheGet(expireDailyCacheKey);
    } catch (error) {
        console.error('Could not get from file cache.', error);
    }

    if (apiData) {
        return apiData;
    }

    let apiResponse: AxiosResponse<ApiResponse<TData>>;

    console.log(`Downloading '${type}' data (offset: ${offset}, take: ${limit})...`);

    try {
        apiResponse = await throttle({ sec: 5 }, axios.get(apiUrl));
    } catch (error) {
        console.error('Failed to fetch API data.', error);
        return undefined;
    }

    apiData = apiResponse.data;

    if (apiData) {
        try {
            await fileCachePut(expireDailyCacheKey, apiData);
        } catch (error) {
            console.error('Could not put to file cache.', error);
        }
    }

    return apiData;
}

const writeNasdaqEtfData = async () => {
    const outputFilePath = 'data/fetchNasdaqAssets/etf.json';
    const assetData = await fetchNasdaqAssets<EtfsApiResponse>('etf');

    if (!assetData || !assetData.data) {
        throw new Error('Failed to fetch ETF data.');
    }

    const assetList = assetData.data.data?.rows || [];
    const assetListJson = jsonSerialize(assetList);

    console.table(assetList);

    console.log(`Writing ${assetList.length} ETFs to ${outputFilePath}...`);
    await putFileText(outputFilePath, assetListJson);
};

const writeNasdaqMutualData = async () => {
    const outputFilePath = 'data/fetchNasdaqAssets/mutualfunds.json';
    let offset = 0;
    const limit = 1000;
    let totalRecords = 0;
    const allFunds: Array<MutualFund> = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const assetData = await fetchNasdaqAssets<MutualFundApiResponse>('mutualfunds', offset, limit);

        if (!assetData || !assetData.data) {
            throw new Error(`Failed to fetch Mutual Fund data (offset: ${offset}, take: ${limit}).`);
        }

        totalRecords = assetData.data.records.totalrecords;

        const assetList = assetData.data.records?.data.rows || [];
        allFunds.push(...assetList);

        if (allFunds.length >= totalRecords) {
            break;
        }

        offset += limit;
    }

    const allFundsJson = jsonSerialize(allFunds);

    console.table(allFunds);

    console.log(`Writing ${allFunds.length} Mutual Funds to ${outputFilePath}...`);
    await putFileText(outputFilePath, allFundsJson);
};

(async () => {
    await writeNasdaqEtfData();
    await writeNasdaqMutualData();
})();
