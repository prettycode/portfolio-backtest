import { MutualFund } from '../../../data/fetchNasdaqAssets/fetchNasdaqAssets';
import mutualFunds from '../../../data/fetchNasdaqAssets/mutualfunds.json';
import { Fund } from '../models/Fund/Fund';

export const fetchNasdaqMutualFundFunds = async (): Promise<Array<Fund> | undefined> => {
    const mutualFundList = mutualFunds as Array<MutualFund>;

    return mutualFundList.map<Fund>((row) => ({
        fundId: row.symbol,
        name: row.companyName.replace('?', ' ').trim(),
        tickerSymbol: row.symbol,
        percentage: 100,
        type: 'Mutual Fund',
        marketRegion: 'Unknown',
        assetClass: 'Equity',
        allocations: []
    }));
};
