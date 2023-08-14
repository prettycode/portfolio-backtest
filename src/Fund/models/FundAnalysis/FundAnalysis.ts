import { Fund } from '../Fund/Fund';
import { FundAllocation } from '../Fund/FundAllocation';

export type FundAnalysis = {
    fundHoldings: Array<FundAllocation>;
    fundFlattened: Array<FundAllocation>;
    fundLeverage: number;
    fundUnlevered: Array<FundAllocation>;
    fundWithMetaData: Array<Fund>;
};
