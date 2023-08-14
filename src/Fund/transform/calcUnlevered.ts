import { FundAllocation } from '../models/Fund/FundAllocation';

export const calcUnlevered = (fundHoldings: Array<FundAllocation>): Array<FundAllocation> => {
    if (!fundHoldings.length) {
        throw new Error('Fund is missing holdings. Cannot calculate unlevered portfolio.');
    }

    const leverage = fundHoldings.reduce((sum, holding) => sum + (holding.percentage < 0 ? 0 : holding.percentage), 0) / 100;

    // Create a new array with the unlevered holdings, filtering out the negative percentages
    const unleveredHoldings = fundHoldings
        .filter((holding) => holding.percentage >= 0)
        .map<FundAllocation>((holding) => ({
            fundId: holding.fundId,
            percentage: holding.percentage / leverage
        }))
        // Sort from highest to lowest percentage
        .sort((a, b) => b.percentage - a.percentage);

    return unleveredHoldings;
};
