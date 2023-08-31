import { FundAllocation } from './FundAllocation';
import { FundAssetClass } from './FundAssetClass';
import { FundMarketRegion } from './FundMarketRegion';
import { FundType } from './FundType';

export type Fund = FundAllocation & {
    allocations: FundAllocation[];
    type: FundType;
    name?: string;
    description?: string;
    tickerSymbol?: string;
    marketRegion?: FundMarketRegion;
    assetClass?: FundAssetClass;
};
