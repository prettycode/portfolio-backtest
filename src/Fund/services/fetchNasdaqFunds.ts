import axios, { AxiosResponse } from 'axios';
import { Fund } from '../models/Fund/Fund';
import { jsonSerialize, tryJsonDeserialize } from '../utils/json';
import { throttle } from '../utils/throttle';

type ApiResponse<TData extends ApiResponseStockData | ApiResponseEtfData> = {
    data: TData;
    message: string | null;
    status: {
        bCodeMessage: string | null;
        developerMessage: string | null;
        rCode: number;
    };
};

type ApiResponseStockData = {
    asOf: string | null;
    headers: StocksTableRow;
    rows: Array<StocksTableRow>;
};

type ApiResponseEtfData = {
    dataAsOf: string | null;
    data: {
        asOf: string | null;
        headers?: EtfTableRow;
        rows?: Array<EtfTableRow>;
    };
};

type StocksTableRow = {
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

type EtfTableRow = {
    companyName: string;
    deltaIndicator: 'up' | 'down';
    lastSalePrice: string;
    netChange: string;
    oneYearPercentage: string;
    percentageChange: string;
    symbol: string;
};

const dailyExpirationCacheKey = (key: string) => `${new Date().toISOString().slice(0, 10)}:${key}`;

async function fetchAssets<TData extends ApiResponseStockData | ApiResponseEtfData>(
    type: 'etf' | 'stocks' | 'mutualfunds'
): Promise<ApiResponse<TData> | undefined> {
    const apiUrl = `https://api.nasdaq.com/api/screener/${type}?download=true`;
    const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
    const expireDailyCacheKey = dailyExpirationCacheKey(corsProxyUrl);

    let apiData: ApiResponse<TData> = tryJsonDeserialize(localStorage.getItem(expireDailyCacheKey));

    if (apiData) {
        return apiData;
    }

    let apiResponse: AxiosResponse<ApiResponse<TData>>;

    try {
        apiResponse = await throttle({ sec: 5 }, axios.get(corsProxyUrl));
    } catch (error) {
        console.error('Failed to fetch API data.', error);
        return undefined;
    }

    apiData = apiResponse.data;

    if (apiData) {
        try {
            localStorage.setItem(expireDailyCacheKey, jsonSerialize(apiData));
        } catch (error) {
            console.error('Could not save data to local storage cache.', error);
        }
    }

    return apiData;
}

export const fetchNasdaqFunds = async (): Promise<Array<Fund> | undefined> => {
    const stocks: ApiResponse<ApiResponseStockData> = await fetchAssets('stocks');
    const etfs: ApiResponse<ApiResponseEtfData> = await fetchAssets('etf');

    console.log('Stocks', stocks.data);
    console.log('ETFs', etfs.data.data);

    return new Date().getTime() > 0
        ? undefined
        : [].flat().map<Fund>((row) => ({
              fundId: row.symbol,
              name: row.name,
              description: `Country/Sector/Industry/Market Cap ${row.country}/${row.sector}/${row.industry}/${row.marketCap}}`,
              tickerSymbol: row.symbol,
              percentage: 100,
              type: 'Market',
              marketRegion: 'Unknown',
              assetClass: 'Equity',
              allocations: []
          }));
};
