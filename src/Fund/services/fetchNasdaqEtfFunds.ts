import { Fund } from '../models/Fund/Fund';
import etfs from '../../../data/fetchNasdaqAssets/etfs.json';
import { Etf } from '../../../data/fetchNasdaqAssets/fetchNasdaqAssets';

export const fetchNasdaqEtfFunds = async (): Promise<Array<Fund> | undefined> => {
    const etfList = etfs as Array<Etf>;

    return new Date().getTime() > 0
        ? undefined
        : etfList.flat().map<Fund>((row) => ({
              fundId: row.symbol,
              name: row.companyName,
              tickerSymbol: row.symbol,
              percentage: 100,
              type: 'ETF',
              marketRegion: 'Unknown',
              assetClass: 'Equity',
              allocations: []
          }));
};
