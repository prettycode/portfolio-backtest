import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../models/Fund/Fund';
import { FundAnalysis } from '../models/FundAnalysis/FundAnalysis';
import { calcFlattenedFund } from './calcFlattenedFund';
import { calcLeverage } from './calcLeverage';
import { calcUnlevered } from './calcUnlevered';
import { calcFundMetadata } from './calcFundMetadata';

export const calcFundAnalysis = async (fund: Fund): Promise<FundAnalysis> => {
    const fundCopy = cloneDeep(fund);
    const fundHoldings = fundCopy.holdings;

    if (!fundHoldings) {
        throw new Error('Fund has no holdings to analyze.');
    }

    const fundFlattened = await calcFlattenedFund(fundCopy);
    const fundLeverage = calcLeverage(fundFlattened);
    const fundUnlevered = calcUnlevered(fundFlattened);
    const fundWithMetaData = await calcFundMetadata(fundUnlevered);

    const analysis: FundAnalysis = {
        fundHoldings,
        fundFlattened,
        fundLeverage,
        fundUnlevered,
        fundWithMetaData
    };

    return analysis;
};
