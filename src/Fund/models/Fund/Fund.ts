import { FundAssetClass } from './FundAssetClass';
import { FundMarketRegion } from './FundMarketRegion';
import { FundType } from './FundType';

export type Fund = {
    fundId: number;
    percentage: number;
    name?: string;
    description?: string;
    tickerSymbol?: string;
    type?: FundType;
    marketRegion?: FundMarketRegion;
    assetClass?: FundAssetClass;
    holdings?: Fund[];
};
