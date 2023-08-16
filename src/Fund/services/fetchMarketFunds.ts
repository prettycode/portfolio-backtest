import { Fund } from '../models/Fund/Fund';

let mock: Array<Fund> | undefined;

export const fetchMarketFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock || [
            {
                fundId: 1,
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
                fundId: 2,
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
                fundId: 3,
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
                fundId: 4,
                name: 'Cash',
                description: 'US Treasury Money Market',
                tickerSymbol: 'CASHX',
                percentage: 100,
                type: 'ETF',
                marketRegion: 'US',
                assetClass: 'Cash',
                allocations: []
            },
            {
                fundId: 5,
                name: 'International Developed Large Cap',
                description: 'DFA Large Cap International Portfolio',
                tickerSymbol: 'DFALX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'International Developed',
                assetClass: 'Equity',
                allocations: []
            },
            {
                fundId: 6,
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
                fundId: 14,
                name: 'US Market',
                description: 'Vanguard Total Stock Market Fund',
                tickerSymbol: 'VTSMX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'US',
                assetClass: 'Equity',
                allocations: []
            }
        ]
    );

fetchMarketFunds.setMock = (mockMarketFunds: Array<Fund>): void => {
    mock = mockMarketFunds;
};
