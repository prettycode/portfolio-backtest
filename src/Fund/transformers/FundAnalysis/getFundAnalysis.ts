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

    const marketRegion = groupBy(cloneDeep(composition), 'marketRegion') as Record<FundMarketRegion, Fund[]>;
    const assetClass = groupBy(cloneDeep(composition), 'assetClass') as Record<FundAssetClass, Fund[]>;
    const assetByRegion: Partial<Record<FundAssetClass, Partial<Record<FundMarketRegion, Array<Fund>>>>> = (
        Object.entries(assetClass) as [FundAssetClass, Array<FundAllocation>][]
    ).reduce(
        (acc, [assetClass, holdings]) => {
            // TODO sort the lowest descendent group of Fund[]s
            acc[assetClass] = groupBy(holdings, 'marketRegion') as Record<FundMarketRegion, Array<Fund>>;
            return acc;
        },
        {} as Partial<Record<FundAssetClass, Partial<Record<FundMarketRegion, Array<Fund>>>>>
    );

    console.log(JSON.stringify(assetByRegion));

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
