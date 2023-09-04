import { Fund } from '../models/Fund/Fund';
import { getFundBacktestFundDetails } from '../transformers/FundAnalysis/getFundBacktestFundId';
import { fetchNasdaqEtfFunds } from './fetchNasdaqEtfFunds';
import { fetchNasdaqMutualFundFunds } from './fetchNasdaqMutualFundFunds';

let mock: Array<Fund> | undefined;

export const fetchMarketFunds = async (): Promise<Array<Fund>> => {
    if (mock) {
        return mock;
    }

    const marketFunds = [...(await fetchNasdaqEtfFunds()), ...(await fetchNasdaqMutualFundFunds())];

    for (const fund of marketFunds) {
        Object.assign(fund, getFundBacktestFundDetails(fund.fundId));
    }

    return marketFunds;
};

fetchMarketFunds.setMock = (mockMarketFunds: Array<Fund>): void => {
    mock = mockMarketFunds;
};
