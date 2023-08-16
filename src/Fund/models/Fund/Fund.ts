import { FundAllocation } from './FundAllocation';
import { FundAssetClass } from './FundAssetClass';
import { FundMarketRegion } from './FundMarketRegion';
import { FundType } from './FundType';

export type Fund = FundAllocation & {
    allocations: FundAllocation[];
    name?: string;
    description?: string;
    tickerSymbol?: string;
    type?: FundType;
    marketRegion?: FundMarketRegion;
    assetClass?: FundAssetClass;
};

/*
export type CustomFund = Fund & {
    tickerSymbol: undefined;
    type: 'Custom';
    marketRegion: undefined;
    assetClass: undefined;
    asetClass: undefined;
};

export type MarketFund = Fund & {
    tickerSymbol: string;
    type: Omit<FundType, 'Cusotm'>;
};
*/

/*
export type Fund = FundAllocation & {
    holdings: FundAllocation[];
    name?: string;
    description?: string;
    tickerSymbol?: string;
    type?: FundType;
    marketRegion?: FundMarketRegion;
    assetClass?: FundAssetClass;
};

export type CustomFund = Fund & {
    tickerSymbol: undefined;
    type: 'Custom';
    marketRegion: undefined;
    assetClass: undefined;
    asetClass: undefined;
};

export type MarketFund = Fund & {
    tickerSymbol: string;
    type: Omit<FundType, 'Cusotm'>;
};
*/
