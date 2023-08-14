import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../models/Fund/Fund';
import { FundAnalysis } from '../models/Fund/FundAnalysis';
import { getFundAllocationsLeverage } from './getFundAllocationsLeverage';
import { getDeleveredFundAllocations } from './getDeleveredFundAllocations';
import { getFundsFromFundAllocations } from './getFundsFromFundAllocations';
import { getFlattenedFundAllocations } from './getFlattenedFundAllocations';

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

    const analysis: FundAnalysis = {
        holdings,
        flattened,
        leverage,
        delevered,
        composition
    };

    return analysis;
};
