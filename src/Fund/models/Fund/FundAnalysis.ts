import { Fund } from './Fund';
import { FundAllocation } from './FundAllocation';

export type FundAnalysis = {
    holdings: Array<FundAllocation>;
    flattened: Array<FundAllocation>;
    leverage: number;
    delevered: Array<FundAllocation>;
    composition: Array<Fund>;
};
