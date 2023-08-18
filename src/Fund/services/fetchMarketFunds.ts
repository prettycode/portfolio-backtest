import { Fund } from '../models/Fund/Fund';

let mock: Array<Fund> | undefined;

export const fetchMarketFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock || [
            {
                fundId: 'VTI',
                name: 'US Market',
                description: 'Vanguard Total Stock Market Index Fund Investor Shares',
                tickerSymbol: 'VTSMX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'US',
                assetClass: 'Equity',
                allocations: []
            },
            {
                fundId: 'SPY',
                name: 'S&P 500',
                description: 'Vanguard 500 Index Fund Investor Shares',
                tickerSymbol: 'VFINX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'US',
                assetClass: 'Equity',
                allocations: []
            },
            {
                fundId: 'VGSH',
                name: 'Short-Term US Treasury',
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
                name: 'Intermediate-Term US Treasury',
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
                name: 'Long-Term US Treasury',
                description: 'Vanguard Long-Term Treasury Fund Investor Shares',
                tickerSymbol: 'VUSTX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'US',
                assetClass: 'Treasury',
                allocations: []
            },
            {
                fundId: 'GLD',
                name: 'Gold',
                description: 'Gold',
                tickerSymbol: '^GOLD',
                percentage: 100,
                type: 'Index',
                marketRegion: 'Global (All-World)',
                assetClass: 'Commodity',
                allocations: []
            },
            {
                fundId: 'USFR',
                name: 'Cash (Floating-Rate)',
                description: 'US Treasury Money Market',
                tickerSymbol: 'CASHX',
                percentage: 100,
                type: 'ETF',
                marketRegion: 'US',
                assetClass: 'Cash',
                allocations: []
            },
            {
                fundId: 'VEA',
                name: 'Int’l Developed Large Cap',
                description: 'DFA Large Cap Int’l Portfolio',
                tickerSymbol: 'DFALX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'Int’l Developed',
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
            },
            {
                fundId: 'IEF',
                name: '7-10 Year US Treasury',
                description: 'iShares 7-10 Year Treasury',
                tickerSymbol: 'IEF',
                percentage: 100,
                type: 'ETF',
                marketRegion: 'US',
                assetClass: 'Treasury',
                allocations: []
            }
        ]
    );

fetchMarketFunds.setMock = (mockMarketFunds: Array<Fund>): void => {
    mock = mockMarketFunds;
};
