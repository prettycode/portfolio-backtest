import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../models/Fund/Fund';
import { FundAnalysis, FundAnalysisDecomposition } from '../models/Fund/FundAnalysis';
import { getFundAllocationsLeverage } from './getFundAllocationsLeverage';
import { getDeleveredFundAllocations } from './getDeleveredFundAllocations';
import { getFundsFromFundAllocations } from './getFundsFromFundAllocations';
import { getFlattenedFundAllocations } from './getFlattenedFundAllocations';
import groupBy from 'lodash.groupby';
import { FundAssetClass } from '../models/Fund/FundAssetClass';
import { FundMarketRegion } from '../models/Fund/FundMarketRegion';

export const getFundAnalysis = async (fund: Fund): Promise<FundAnalysis> => {
    const fundCopy = cloneDeep(fund);
    const holdings = fundCopy.holdings;

    if (!holdings) {
        throw new Error('Fund has no holdings to analyze.');
    }

    const flattened = await getFlattenedFundAllocations(fundCopy);
    const leverage = getFundAllocationsLeverage(flattened);
    const delevered = getDeleveredFundAllocations(flattened);
    const composition = await getFundsFromFundAllocations(delevered);
    const decomposed: FundAnalysisDecomposition = {
        assetClass: groupBy(cloneDeep(composition), 'assetClass') as Record<FundAssetClass, Fund[]>,
        marketRegion: groupBy(cloneDeep(composition), 'marketRegion') as Record<FundMarketRegion, Fund[]>
    };

    const analysis: FundAnalysis = {
        holdings,
        flattened,
        leverage,
        delevered,
        composition,
        decomposed
    };

    return analysis;
};
