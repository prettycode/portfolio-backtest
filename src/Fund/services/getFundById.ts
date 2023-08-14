import { Fund } from '../models/Fund/Fund';
import { fetchCustomFunds } from './fetchCustomFunds';
import { fetchMarketFunds } from './fetchMarketFunds';

export const getFundById = async (fundId: number, funds?: Array<Fund>): Promise<Fund> => {
    const allFunds = funds || [...(await fetchMarketFunds()), ...(await fetchCustomFunds())];

    const matchingFund = allFunds.find((fund) => fund.fundId === fundId);

    if (!matchingFund) {
        throw new Error(`Could not find fund matching id "${fundId}"`);
    }

    return matchingFund;
};
