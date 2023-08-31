import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../../models/Fund/Fund';
import { FundAnalysis } from '../../models/FundAnalysis/FundAnalysis';
import groupBy from 'lodash.groupby';
import { FundAssetClass } from '../../models/Fund/FundAssetClass';
import { FundMarketRegion } from '../../models/Fund/FundMarketRegion';
import { getDeleveredFundAllocations } from '../Fund/getDeleveredFundAllocations';
import { getFlattenedFundAllocations } from '../Fund/getFlattenedFundAllocations';
import { getFundAllocationsLeverage } from '../Fund/getFundAllocationsLeverage';
import { getFundFromFundAllocation } from '../Fund/getFundsFromFundAllocations';
import { FundAllocation } from '../../models/Fund/FundAllocation';

export const getFundAnalysisForCustomFund = async (fundAllocations: Array<FundAllocation>): Promise<FundAnalysis> => {
    const holdings = cloneDeep(fundAllocations);

    if (!holdings.length) {
        throw new Error('Fund has no holdings to analyze.');
    }

    const flattened = await getFlattenedFundAllocations(holdings);
    const leverage = getFundAllocationsLeverage(flattened);
    const delevered = getDeleveredFundAllocations(flattened);
    const composition = await getFundFromFundAllocation(delevered);

    const marketRegion = groupBy(cloneDeep(composition), 'marketRegion') as Record<FundMarketRegion, Fund[]>;
    const assetClass = groupBy(cloneDeep(composition), 'assetClass') as Record<FundAssetClass, Fund[]>;
    const assetByRegion: Partial<Record<FundAssetClass, Partial<Record<FundMarketRegion, Array<Fund>>>>> = (
        Object.entries(assetClass) as [FundAssetClass, Array<FundAllocation>][]
    ).reduce(
        (acc, [assetClass, holdings]) => {
            acc[assetClass] = groupBy(holdings, 'marketRegion') as Record<FundMarketRegion, Array<Fund>>;
            return acc;
        },
        {} as Partial<Record<FundAssetClass, Partial<Record<FundMarketRegion, Array<Fund>>>>>
    );

    const analysis: FundAnalysis = {
        holdings,
        flattened,
        leverage,
        delevered,
        composition,
        decomposed: {
            marketRegion,
            assetClass,
            assetByRegion
        }
    };

    return analysis;
};
