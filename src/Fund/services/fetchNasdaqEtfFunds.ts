import { Fund } from '../models/Fund/Fund';
import etfs from '../../../data/fetchNasdaqAssets/etf.json';
import { Etf } from '../../../data/fetchNasdaqAssets/fetchNasdaqAssets';

export const fetchNasdaqEtfFunds = async (): Promise<Array<Fund> | undefined> => {
    const etfList = etfs as Array<Etf>;

    return etfList.map<Fund>((row) => ({
        fundId: row.symbol,
        name: row.companyName.replace('?', ' ').trim(),
        tickerSymbol: row.symbol,
        percentage: 100,
        type: 'ETF',
        marketRegion: 'Unknown',
        assetClass: 'Equity',
        allocations: []
    }));
};
