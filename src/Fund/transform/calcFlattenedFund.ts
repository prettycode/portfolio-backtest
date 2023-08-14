import { Fund } from '../models/Fund/Fund';
import { FundAllocation } from '../models/Fund/FundAllocation';
import { getFundById } from '../services/getFundById';

const sortFundAllocationsDescending = (funds: Array<FundAllocation>) => funds.sort((a, b) => b.percentage - a.percentage);

export const calcFlattenedFundAllocation = async (fund: Fund, fundsDictionary?: Array<Fund>): Promise<Array<FundAllocation>> => {
    const flattened: Array<FundAllocation> = [];

    async function flatten(holdings: Array<FundAllocation>, weight: number) {
        for (const holding of holdings) {
            const holdingFund = await getFundById(holding.fundId, fundsDictionary);

            if (holdingFund.holdings && holdingFund.holdings.length > 0) {
                await flatten(holdingFund.holdings, (holding.percentage * weight) / 100);
            } else {
                flattened.push({
                    fundId: holding.fundId,
                    percentage: (holding.percentage * weight) / 100
                });
            }
        }
    }

    await flatten(fund.holdings && fund.holdings.length > 0 ? fund.holdings : [fund], fund.percentage);

    // TODO no unit tests written cover this yet
    // Collapsing duplicates and summing percentages
    const holdingsGrouped = flattened.reduce((acc: Array<FundAllocation>, curr: FundAllocation) => {
        const existingEntry = acc.find((entry) => entry.fundId === curr.fundId);

        if (existingEntry) {
            existingEntry.percentage += curr.percentage;
        } else {
            acc.push(curr);
        }

        return acc;
    }, []);

    // sort DESC
    return sortFundAllocationsDescending(holdingsGrouped);
};
