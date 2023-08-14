import { Fund } from '../models/Fund/Fund';
import { calcFlattenedFund } from './calcFlattenedFund';

const marketFunds: Fund[] = [
    {
        id: 1,
        percentage: 100,
        name: 'VT',
        marketRegion: 'Global (All-World)',
        assetClass: 'Equity',
        holdings: []
    },
    {
        id: 2,
        percentage: 100,
        name: 'VTI',
        marketRegion: 'US',
        assetClass: 'Equity',
        holdings: []
    },
    {
        id: 3,
        percentage: 100,
        name: 'VEA',
        marketRegion: 'International Developed',
        assetClass: 'Equity',
        holdings: []
    },
    {
        id: 4,
        percentage: 100,
        name: 'VWO',
        marketRegion: 'Emerging',
        assetClass: 'Equity',
        holdings: []
    },
    {
        id: 5,
        percentage: 100,
        name: 'BNDW',
        marketRegion: 'Global (All-World)',
        assetClass: 'Bond',
        holdings: []
    },
    {
        id: 6,
        percentage: 100,
        name: 'GLD',
        marketRegion: 'Global (All-World)',
        assetClass: 'Commodity',
        holdings: []
    }
];

const customFunds: Fund[] = [
    {
        id: 7,
        percentage: 100,
        name: 'Market-cap Weighted All-World Equity',
        holdings: [{ id: 1, percentage: 100 }]
    },
    {
        id: 8,
        percentage: 100,
        name: '60/20/20 All-World Equity',
        holdings: [
            { id: 2, percentage: 60 },
            { id: 3, percentage: 20 },
            { id: 4, percentage: 20 }
        ]
    },
    {
        id: 9,
        percentage: 100,
        name: '90/10 All-World Equity/Bonds',
        holdings: [
            { id: 8, percentage: 90 },
            { id: 5, percentage: 10 }
        ]
    },
    {
        id: 10,
        percentage: 100,
        name: '80% 90/10 All-World Equity/Bonds + 10% Gold',
        holdings: [
            { id: 9, percentage: 80 },
            { id: 6, percentage: 20 }
        ]
    },
    {
        id: 11,
        percentage: 100,
        name: '50% Bonds + 50% Gold',
        holdings: [
            { id: 5, percentage: 50 },
            { id: 6, percentage: 50 }
        ]
    },
    {
        id: 12,
        percentage: 100,
        name: '50% All-World Equities + 50% Bonds/Gold Split',
        holdings: [
            { id: 8, percentage: 50 },
            { id: 11, percentage: 50 }
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
                id: given.id,
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
                id: marketFunds[0].id,
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
            { id: 2, percentage: 60 },
            { id: 3, percentage: 20 },
            { id: 4, percentage: 20 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of market fund and custom fund into fund of market and custom fund', async () => {
        const given = customFunds[2];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            { id: 2, percentage: 60 * 0.9 },
            { id: 3, percentage: 20 * 0.9 },
            { id: 4, percentage: 20 * 0.9 },
            { id: 5, percentage: 100 * 0.1 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of market fund and custom fund into fund of market and custom fund', async () => {
        const given = customFunds[3];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            { id: 2, percentage: 60 * 0.9 * 0.8 },
            { id: 6, percentage: 20 * 1.0 * 1.0 },
            { id: 3, percentage: 20 * 0.9 * 0.8 },
            { id: 4, percentage: 20 * 0.9 * 0.8 },
            { id: 5, percentage: 100 * 0.1 * 0.8 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });

    it('should flatten custom fund of custom funds', async () => {
        const given = customFunds[5];
        const actual = await calcFlattenedFund(given, allFunds);
        const expected: Array<Fund> = [
            { id: 2, percentage: 60 * 0.5 },
            { id: 5, percentage: 50 * 0.5 },
            { id: 6, percentage: 50 * 0.5 },
            { id: 3, percentage: 20 * 0.5 },
            { id: 4, percentage: 20 * 0.5 }
        ];

        expect(actual).toEqual(expected);
        expect(fundTotal(actual)).toBe(100);
    });
});
