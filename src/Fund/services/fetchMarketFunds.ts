import { Fund } from '../models/Fund/Fund';
import { fetchNasdaqFunds } from './fetchNasdaqFunds';

let mock: Array<Fund> | undefined;

export const fetchMarketFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock ||
            (await fetchNasdaqFunds()) || [
                {
                    fundId: 'VTI',
                    name: 'US Total-Market',
                    description: 'Vanguard Total Stock Market Index Fund Investor Shares',
                    tickerSymbol: 'VTSMX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'US',
                    assetClass: 'Equity',
                    allocations: []
                },
                {
                    fundId: 'XLU',
                    name: 'US Large-Cap Utilities',
                    description: '',
                    tickerSymbol: 'XLU',
                    percentage: 100,
                    type: 'ETF',
                    marketRegion: 'US',
                    assetClass: 'Equity',
                    allocations: []
                },
                {
                    fundId: 'XLP',
                    name: 'US Large-Cap Consumer Staples',
                    description: '',
                    tickerSymbol: 'XLP',
                    percentage: 100,
                    type: 'ETF',
                    marketRegion: 'US',
                    assetClass: 'Equity',
                    allocations: []
                },
                {
                    fundId: 'XLV',
                    name: 'US Large-Cap Healthcare',
                    description: '',
                    tickerSymbol: 'XLV',
                    percentage: 100,
                    type: 'ETF',
                    marketRegion: 'US',
                    assetClass: 'Equity',
                    allocations: []
                },
                {
                    fundId: 'SPY',
                    name: 'US S&P 500',
                    description: 'Vanguard 500 Index Fund Investor Shares',
                    tickerSymbol: 'VFINX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'US',
                    assetClass: 'Equity',
                    allocations: []
                },
                {
                    fundId: 'USFR',
                    name: 'US Cash',
                    description: 'US Treasury Money Market',
                    tickerSymbol: 'CASHX',
                    percentage: 100,
                    type: 'ETF',
                    marketRegion: 'US',
                    assetClass: 'Cash',
                    allocations: []
                },
                {
                    fundId: 'VGSH',
                    name: 'US Short-Term Treasuries',
                    description: 'Vanguard Short-Term Treasury Fund Investor Shares',
                    tickerSymbol: 'VFISX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'US',
                    assetClass: 'Treasury',
                    allocations: []
                },
                {
                    fundId: 'VGIT',
                    name: 'US Intermediate-Term Treasuries',
                    description: 'Vanguard Intermediate-Term Treasury Fund Investor Shares',
                    tickerSymbol: 'VFITX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'US',
                    assetClass: 'Treasury',
                    allocations: []
                },
                {
                    fundId: 'VGLT',
                    name: 'US Long-Term Treasuries',
                    description: 'Vanguard Long-Term Treasury Fund Investor Shares',
                    tickerSymbol: 'VUSTX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'US',
                    assetClass: 'Treasury',
                    allocations: []
                },
                {
                    fundId: 'EDV',
                    name: 'US 20 – 30-Year Treasuries STRIPS',
                    description: 'Vanguard Extended Duration Treasury Index Fund Institutional Shares',
                    tickerSymbol: 'VEDTX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'US',
                    assetClass: 'Treasury',
                    allocations: []
                },
                {
                    fundId: 'GLD',
                    name: 'Gold',
                    description: 'Gold Index',
                    tickerSymbol: '^GOLD',
                    percentage: 100,
                    type: 'Index',
                    marketRegion: 'Global (All-World)',
                    assetClass: 'Commodity',
                    allocations: []
                },
                {
                    fundId: 'VEA',
                    name: 'Int’l Developed Large Cap',
                    description: 'DFA Large Cap Int’l Portfolio',
                    tickerSymbol: 'DFALX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'International Developed',
                    assetClass: 'Equity',
                    allocations: []
                },
                {
                    fundId: 'VWO',
                    name: 'Emerging Markets',
                    description: 'Vanguard Emerging Markets Stock Index Fund',
                    tickerSymbol: 'VEIEX',
                    percentage: 100,
                    type: 'Mutual Fund',
                    marketRegion: 'Emerging',
                    assetClass: 'Equity',
                    allocations: []
                }
            ]
    );

fetchMarketFunds.setMock = (mockMarketFunds: Array<Fund>): void => {
    mock = mockMarketFunds;
};
