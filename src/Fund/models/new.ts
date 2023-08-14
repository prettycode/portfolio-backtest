/*
import { FundAssetClass } from "./Fund/FundAssetClass";
import { FundMarketRegion } from "./Fund/FundMarketRegion";
import { FundType } from "./Fund/FundType";

export type FundAllocation = {
  fundId: number;
  percentage: number;
};

export type Fund = FundAllocation & {
  percentage: 100; 
  name: string;
  description: string;
  type: FundType;
  holdings: FundAllocation[];
  marketRegion: FundMarketRegion;
  assetClass: FundAssetClass;
  tickerSymbol: string;
};

export type CustomFund = Omit<Fund, 'marketRegion' | 'assetClass' | 'tickerSymbol'> & {
  type: 'Custom';
};
*/
