import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../models/Fund/Fund';
import { fetchFundByFundId } from '../services/fetchFundByFundId';
import { FundAllocation } from '../models/Fund/FundAllocation';

export const getFundsFromFundAllocations = async (fundHoldings: Array<FundAllocation>): Promise<Fund[]> => {
    const holdingsAsFunds = await Promise.all(
        fundHoldings.map(async (holding) => {
            const holdingDefinition: Fund = await fetchFundByFundId(holding.fundId);
            const fund: Fund = {
                ...cloneDeep(holdingDefinition),
                percentage: holding.percentage
            };

            return fund;
        })
    );

    return holdingsAsFunds;
};
