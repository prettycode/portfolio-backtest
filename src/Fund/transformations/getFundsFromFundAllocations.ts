import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../models/Fund/Fund';
import { getFundById } from '../services/getFundById';
import { FundAllocation } from '../models/Fund/FundAllocation';

export const getFundsFromFundAllocations = async (fundHoldings: FundAllocation[], fundsDictionary?: Array<Fund>): Promise<Fund[]> => {
    const holdingsAsFunds = await Promise.all(
        fundHoldings.map(async (holding) => {
            const holdingDefinition: Fund = await getFundById(holding.fundId, fundsDictionary);
            const fund: Fund = {
                ...cloneDeep(holdingDefinition),
                percentage: holding.percentage
            };

            return fund;
        })
    );

    return holdingsAsFunds;
};
