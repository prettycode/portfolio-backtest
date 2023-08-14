import { Fund } from '../models/Fund/Fund';
import { calcFlattenedFund } from './calcFlattenedFund';

const marketFunds: Fund[] = [
    {
        fundId: 1,
        percentage: 100,
        name: 'VT',
        marketRegion: 'Global (All-World)',
        assetClass: 'Equity',
        holdings: [],
        description: '',
        tickerSymbol: '',
        type: 'ETF'
    },
    {
        fundId: 2,
        percentage: 100,
        name: 'VTI',
        marketRegion: 'US',
        assetClass: 'Equity',
        holdings: [],
        description: '',
        tickerSymbol: '',
        type: 'ETF'
    },
    {
        fundId: 3,
        percentage: 100,
        name: 'VEA',
        marketRegion: 'International Developed',
        assetClass: 'Equity',
        holdings: [],
        description: '',
        tickerSymbol: '',
        type: 'ETF'
    },
    {
        fundId: 4,
        percentage: 100,
        name: 'VWO',
        marketRegion: 'Emerging',
        assetClass: 'Equity',
        holdings: [],
        description: '',
        tickerSymbol: '',
        type: 'ETF'
    },
    {
        fundId: 5,
        percentage: 100,
        name: 'BNDW',
        marketRegion: 'Global (All-World)',
        assetClass: 'Bond',
        holdings: [],
        description: '',
        tickerSymbol: '',
        type: 'ETF'
    },
    {
        fundId: 6,
        percentage: 100,
        name: 'GLD',
        marketRegion: 'Global (All-World)',
        assetClass: 'Commodity',
        holdings: [],
        description: '',
        tickerSymbol: '',
        type: 'ETF'
    }
];

const customFunds: Fund[] = [
    {
        fundId: 7,
        percentage: 100,
        name: 'Market-cap Weighted All-World Equity',
        description: '',
        type: 'Custom',
        holdings: [{ fundId: 1, percentage: 100 }]
    },
    {
        fundId: 8,
        percentage: 100,
        name: '60/20/20 All-World Equity',
        description: '',
        type: 'Custom',
        holdings: [
            { fundId: 2, percentage: 60 },
            { fundId: 3, percentage: 20 },
            { fundId: 4, percentage: 20 }
        ]
    },
    {
        fundId: 9,
        percentage: 100,
        name: '90/10 All-World Equity/Bonds',
        description: '',
        type: 'Custom',
        holdings: [
            { fundId: 8, percentage: 90 },
            { fundId: 5, percentage: 10 }
        ]
    },
    {
        fundId: 10,
        percentage: 100,
        name: '80% 90/10 All-World Equity/Bonds + 10% Gold',
        description: '',
        type: 'Custom',
        holdings: [
            { fundId: 9, percentage: 80 },
            { fundId: 6, percentage: 20 }
        ]
    },
    {
        fundId: 11,
        percentage: 100,
        name: '50% Bonds + 50% Gold',
        description: '',
        type: 'Custom',
        holdings: [
            { fundId: 5, percentage: 50 },
            { fundId: 6, percentage: 50 }
        ]
    },
    {
        fundId: 12,
        percentage: 100,
        name: '50% All-World Equities + 50% Bonds/Gold Split',
        description: '',
        type: 'Custom',
        holdings: [
            { fundId: 8, percentage: 50 },
            { fundId: 11, percentage: 50 }
        ]
    }
];

const allFunds = [...marketFunds, ...customFunds];

// TODO hack for
const fundTotal = (fund: Array<Fund>): number => +fund.reduce((acc, curr) => acc + curr.percentage, 0).toFixed(2);

describe('flattenFund', () => {
    it('should flatten market fund into fund of only that market fund', async () => {
        const given = marketFunds[0];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            {
                fundId: given.fundId,
                percentage: given.percentage
            }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of market fund into fund of only that market fund', async () => {
        const given = customFunds[0];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            {
                fundId: marketFunds[0].fundId,
                percentage: 100
            }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of market funds into fund of market funds', async () => {
        const given = customFunds[1];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            { fundId: 2, percentage: 60 },
            { fundId: 3, percentage: 20 },
            { fundId: 4, percentage: 20 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of market fund and custom fund into fund of market and custom fund', async () => {
        const given = customFunds[2];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            { fundId: 2, percentage: 60 * 0.9 },
            { fundId: 3, percentage: 20 * 0.9 },
            { fundId: 4, percentage: 20 * 0.9 },
            { fundId: 5, percentage: 100 * 0.1 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of market fund and custom fund into fund of market and custom fund', async () => {
        const given = customFunds[3];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            { fundId: 2, percentage: 60 * 0.9 * 0.8 },
            { fundId: 6, percentage: 20 * 1.0 * 1.0 },
            { fundId: 3, percentage: 20 * 0.9 * 0.8 },
            { fundId: 4, percentage: 20 * 0.9 * 0.8 },
            { fundId: 5, percentage: 100 * 0.1 * 0.8 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of custom funds', async () => {
        const given = customFunds[5];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            { fundId: 2, percentage: 60 * 0.5 },
            { fundId: 5, percentage: 50 * 0.5 },
            { fundId: 6, percentage: 50 * 0.5 },
            { fundId: 3, percentage: 20 * 0.5 },
            { fundId: 4, percentage: 20 * 0.5 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });
});
