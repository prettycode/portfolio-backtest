import { Fund } from './Fund';
import { FundAllocation } from './FundAllocation';
import { FundAssetClass } from './FundAssetClass';
import { FundMarketRegion } from './FundMarketRegion';

export type FundAnalysisDecomposition = {
    assetClass: Record<FundAssetClass, Fund[]>;
    marketRegion: Record<FundMarketRegion, Fund[]>;
};

export type FundAnalysis = {
    holdings: Array<FundAllocation>;
    flattened: Array<FundAllocation>;
    leverage: number;
    delevered: Array<FundAllocation>;
    composition: Array<Fund>;
    decomposed: FundAnalysisDecomposition;
};
