import { Fund } from '../models/Fund/Fund';
import { fetchCustomFunds } from './fetchCustomFunds';
import { fetchMarketFunds } from './fetchMarketFunds';

const findFund = (fundId: string | number, funds: Array<Fund>): Fund | undefined => funds.find((fund) => fund.fundId == fundId);

export const getFundById = async (fundId: string | number, funds?: Array<Fund>): Promise<Fund> => {
    if (funds) {
        const matchingFund = findFund(fundId, funds);

        if (matchingFund) {
            return matchingFund;
        }
    }

    const marketFunds = await fetchMarketFunds();
    const matchingMarketFund = findFund(fundId, marketFunds);

    if (matchingMarketFund) {
        return matchingMarketFund;
    }

    const customFunds = await fetchCustomFunds();
    const matchingCustomFund = findFund(fundId, customFunds);

    if (matchingCustomFund) {
        return matchingCustomFund;
    }

    throw new Error(`Could not find fund matching id "${fundId}"`);
};
