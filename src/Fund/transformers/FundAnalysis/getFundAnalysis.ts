import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../../models/Fund/Fund';
import { FundAnalysis } from '../../models/FundAnalysis/FundAnalysis';
import groupBy from 'lodash.groupby';
import { FundAssetClass } from '../../models/Fund/FundAssetClass';
import { FundMarketRegion } from '../../models/Fund/FundMarketRegion';
import { getDeleveredFundAllocations } from '../Fund/getDeleveredFundAllocations';
import { getFlattenedFundAllocations } from '../Fund/getFlattenedFundAllocations';
import { getFundAllocationsLeverage } from '../Fund/getFundAllocationsLeverage';
import { getFundsFromFundAllocations } from '../Fund/getFundsFromFundAllocations';
import { FundAllocation } from '../../models/Fund/FundAllocation';

export const getFundAnalysis = async (fundAllocations: Array<FundAllocation>): Promise<FundAnalysis> => {
    const holdings = cloneDeep(fundAllocations);

    if (!holdings.length) {
        throw new Error('Fund has no holdings to analyze.');
    }

    // TODO in next commit, refactor getFlattenedFundAllocations to accept holdings instead
    const flattened = await getFlattenedFundAllocations({ fundId: -1, percentage: 100, holdings });
    const leverage = getFundAllocationsLeverage(flattened);
    const delevered = getDeleveredFundAllocations(flattened);
    const composition = await getFundsFromFundAllocations(delevered);
    const decomposed = {
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
