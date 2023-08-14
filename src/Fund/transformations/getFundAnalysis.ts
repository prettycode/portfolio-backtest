import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../models/Fund/Fund';
import { FundAnalysis } from '../models/Fund/FundAnalysis';
import { getFundAllocationsLeverage } from './getFundAllocationsLeverage';
import { getDeleveredFundAllocations } from './getDeleveredFundAllocations';
import { getFundsFromFundAllocations } from './getFundsFromFundAllocations';
import { getFlattenedFundAllocations } from './getFlattenedFundAllocations';

export const getFundAnalysis = async (fund: Fund): Promise<FundAnalysis> => {
    const fundCopy = cloneDeep(fund);
    const fundHoldings = fundCopy.holdings;

    if (!fundHoldings) {
        throw new Error('Fund has no holdings to analyze.');
    }

    const fundFlattened = await getFlattenedFundAllocations(fundCopy);
    const fundLeverage = getFundAllocationsLeverage(fundFlattened);
    const fundUnlevered = getDeleveredFundAllocations(fundFlattened);
    const fundWithMetaData = await getFundsFromFundAllocations(fundUnlevered);

    const analysis: FundAnalysis = {
        holdings: fundHoldings,
        flattened: fundFlattened,
        leverage: fundLeverage,
        delevered: fundUnlevered,
        composition: fundWithMetaData
    };

    return analysis;
};
