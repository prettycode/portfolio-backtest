import { FundAllocation } from './FundAllocation';
import { FundAssetClass } from './FundAssetClass';
import { FundMarketRegion } from './FundMarketRegion';
import { FundType } from './FundType';

export type Fund = FundAllocation & {
    name?: string;
    description?: string;
    tickerSymbol?: string;
    type?: FundType;
    marketRegion?: FundMarketRegion;
    assetClass?: FundAssetClass;
    holdings?: FundAllocation[];
};
