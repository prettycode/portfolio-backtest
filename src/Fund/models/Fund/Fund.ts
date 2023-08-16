import { FundAllocation } from './FundAllocation';
import { FundAssetClass } from './FundAssetClass';
import { FundMarketRegion } from './FundMarketRegion';
import { FundType } from './FundType';

export type Fund = FundAllocation & {
    allocations: FundAllocation[];
    name?: string;
    description?: string;
};

export type CustomFund = Fund & {
    type: 'Custom';
};

export type MarketFund = Fund & {
    tickerSymbol: string;
    marketRegion: FundMarketRegion;
    assetClass?: FundAssetClass;
    type: Omit<FundType, 'Cusotm'>;
};
