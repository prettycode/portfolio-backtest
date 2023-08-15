import { Fund } from './Fund';
import { FundAllocation } from './FundAllocation';
import { FundAssetClass } from './FundAssetClass';
import { FundMarketRegion } from './FundMarketRegion';

export type FundAnalysis = {
    holdings: Array<FundAllocation>;
    flattened: Array<FundAllocation>;
    leverage: number;
    delevered: Array<FundAllocation>;
    composition: Array<Fund>;
    decomposed: {
        assetClass: Record<FundAssetClass, Array<Fund>>;
        marketRegion: Record<FundMarketRegion, Array<Fund>>;
    };
};
