import cloneDeep from 'lodash.clonedeep';
import { Fund } from '../models/Fund/Fund';
import { getFundById } from '../services/getFundById';

export const calcFundMetadata = async (fundHoldings: Fund[], funds?: Array<Fund>): Promise<Fund[]> => {
    const fundHoldingsCopy = cloneDeep(fundHoldings);

    for (const holding of fundHoldingsCopy) {
        const fundDefinition = await getFundById(holding.id, funds);

        if (!holding.assetClass) {
            holding.assetClass = fundDefinition.assetClass;
        }

        if (!holding.marketRegion) {
            holding.marketRegion = fundDefinition.marketRegion;
        }
    }

    return fundHoldingsCopy;
};
