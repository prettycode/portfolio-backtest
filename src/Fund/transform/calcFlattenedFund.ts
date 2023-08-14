import { Fund } from '../models/Fund/Fund';
import { getFundById } from '../services/getFundById';

const sortFundsDescending = (funds: Array<Fund>) => funds.sort((a, b) => b.percentage - a.percentage);

export const calcFlattenedFund = async (fund: Fund, fundsDictionary?: Array<Fund>): Promise<Array<Fund>> => {
    const flattened: Array<Fund> = [];

    async function flatten(holdings: Array<Fund>, weight: number) {
        for (const holding of holdings) {
            const holdingFund = await getFundById(holding.id, fundsDictionary);

            if (holdingFund.holdings && holdingFund.holdings.length > 0) {
                await flatten(holdingFund.holdings, (holding.percentage * weight) / 100);
            } else {
                flattened.push({
                    id: holding.id,
                    percentage: (holding.percentage * weight) / 100
                });
            }
        }
    }

    await flatten(fund.holdings && fund.holdings.length > 0 ? fund.holdings : [fund], fund.percentage);

    // TODO no unit tests written cover this yet
    // Collapsing duplicates and summing percentages
    const holdingsGrouped = flattened.reduce((acc: Array<Fund>, curr: Fund) => {
        const existingEntry = acc.find((entry) => entry.id === curr.id);

        if (existingEntry) {
            existingEntry.percentage += curr.percentage;
        } else {
            acc.push(curr);
        }

        return acc;
    }, []);

    // sort DESC
    return sortFundsDescending(holdingsGrouped);
};
