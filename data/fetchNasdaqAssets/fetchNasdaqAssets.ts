import axios, { AxiosResponse } from 'axios';
import { throttle } from '../utils/throttle';
import { fileCacheGet, fileCachePut } from '../utils/fileCache';
import { putFileText } from '../utils/fs';
import { jsonSerialize } from '../utils/json';

type ApiResponse<TData extends StocksApiResponse | EtfsApiResponse> = {
    data: TData;
    message: string | null;
    status: {
        bCodeMessage: string | null;
        developerMessage: string | null;
        rCode: number;
    };
};

type StocksApiResponse = {
    asOf: string | null;
    headers: Stock;
    rows: Array<Stock>;
};

type EtfsApiResponse = {
    dataAsOf: string | null;
    data: {
        asOf: string | null;
        headers?: Etf;
        rows?: Array<Etf>;
    };
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

export type Etf = {
    companyName: string;
    deltaIndicator: 'up' | 'down';
    lastSalePrice: string;
    netChange: string;
    oneYearPercentage: string;
    percentageChange: string;
    symbol: string;
};

const dailyExpirationCacheKey = (key: string) => `${new Date().toISOString().slice(0, 10)}:${key}`;

export async function fetchNasdaqAssets<TData extends StocksApiResponse | EtfsApiResponse>(
    type: 'etf' | 'stocks' | 'mutualfunds'
): Promise<ApiResponse<TData> | undefined> {
    const apiUrl = `https://api.nasdaq.com/api/screener/${type}?download=true`;
    const expireDailyCacheKey = dailyExpirationCacheKey(apiUrl);

    let apiData: ApiResponse<TData> = await fileCacheGet(expireDailyCacheKey);

    if (apiData) {
        return apiData;
    }

    let apiResponse: AxiosResponse<ApiResponse<TData>>;

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
            console.error('Could not save data to local storage cache.', error);
        }
    }

    return apiData;
}

(async () => {
    const etfData = await fetchNasdaqAssets<EtfsApiResponse>('etf');
    const etfList = etfData?.data.data.rows ?? [];
    const eftJson = jsonSerialize(etfList);

    console.table(etfList);

    await putFileText(`data/fetchNasdaqAssets/etfs.json`, eftJson);
})();
