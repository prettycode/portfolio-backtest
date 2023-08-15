import { Fund } from '../models/Fund/Fund';

let mock: Array<Fund> | undefined;

export const fetchMarketFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock || [
            {
                fundId: 1,
                name: 'VFINX (SPY)',
                description: 'Vanguard 500 Index Fund Investor Shares',
                tickerSymbol: 'VFINX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'US',
                assetClass: 'Equity',
                holdings: []
            },
            {
                fundId: 2,
                name: 'VFITX (VGIT)',
                description: 'Vanguard Intermediate-Term Treasury Fund Investor Shares',
                tickerSymbol: 'VFITX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'US',
                assetClass: 'Treasury',
                holdings: []
            },
            {
                fundId: 3,
                name: '^GOLD (GLD)',
                description: 'Gold',
                tickerSymbol: '^GOLD',
                percentage: 100,
                type: 'Index',
                marketRegion: 'Global (All-World)',
                assetClass: 'Commodity',
                holdings: []
            },
            {
                fundId: 4,
                name: 'CASHX (SGOV)',
                description: 'Treasury money market',
                tickerSymbol: 'CASHX',
                percentage: 100,
                type: 'ETF',
                marketRegion: 'US',
                assetClass: 'Cash',
                holdings: []
            },
            {
                fundId: 5,
                name: 'DFALX (VEA)',
                description: 'DFA Large Cap International Portfolio',
                tickerSymbol: 'DFALX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'International Developed',
                assetClass: 'Equity',
                holdings: []
            },
            {
                fundId: 6,
                name: 'VEIEX (VWO)',
                description: 'Vanguard Emerging Markets Stock Index Fund',
                tickerSymbol: 'VEIEX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'Emerging',
                assetClass: 'Equity',
                holdings: []
            },
            {
                fundId: 14,
                name: 'VTSMX (VTI)',
                description: 'Vanguard Total Stock Market Fund',
                tickerSymbol: 'VTSMX',
                percentage: 100,
                type: 'Mutual Fund',
                marketRegion: 'US',
                assetClass: 'Equity',
                holdings: []
            }
        ]
    );

fetchMarketFunds.setMock = (mockMarketFunds: Array<Fund>): void => {
    mock = mockMarketFunds;
};
