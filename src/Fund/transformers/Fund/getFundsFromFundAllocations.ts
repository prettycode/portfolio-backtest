import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../../models/Fund/Fund';
import { fetchFundByFundId } from '../../services/fetchFundByFundId';
import { FundAllocation } from '../../models/Fund/FundAllocation';

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

/**
 *
 * @param allocation
 * @returns
 */
export const getFundFromFundAllocation = async (allocation: FundAllocation | Array<FundAllocation>): Promise<Array<Fund>> => {
    const allocations = Array.isArray(allocation) ? allocation : [allocation];
    const allocationsAsFunds = await Promise.all(
        allocations.map(async (allocation) => {
            const holdingDefinition: Fund = await fetchFundByFundId(allocation.fundId);
            const fund: Fund = {
                ...cloneDeep(holdingDefinition),
                percentage: allocation.percentage
            };

            return fund;
        })
    );

    return allocationsAsFunds;
};
