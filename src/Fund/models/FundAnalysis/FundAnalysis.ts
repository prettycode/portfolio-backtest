import { Fund } from '../Fund/Fund';

export type FundAnalysis = {
    fundHoldings: Array<Fund>;
    fundFlattened: Array<Fund>;
    fundLeverage: number;
    fundUnlevered: Array<Fund>;
    fundWithMetaData: Array<Fund>;
};
