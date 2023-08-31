import { Fund } from '../models/Fund/Fund';
import { fetchCustomFunds } from './fetchCustomFunds';
import { fetchMarketFunds } from './fetchMarketFunds';

const findFund = (fundId: string, funds: Array<Fund>): Fund | undefined => funds.find((fund) => fund.fundId == fundId);

export const fetchFundByFundId = async (fundId: string): Promise<Fund> => {
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
