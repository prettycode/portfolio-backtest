import { FundAllocation } from '../models/Fund/FundAllocation';
import { calcUnlevered } from './calcUnlevered';

describe('calcUnlevered', () => {
    it('should throw an error if holdings are missing', () => {
        const fundHoldings: Array<FundAllocation> = [];
        expect(() => calcUnlevered(fundHoldings)).toThrow();
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 1, percentage: -50 },
            { fundId: 2, percentage: 90 },
            { fundId: 3, percentage: 60 }
        ];

        const expected: Array<FundAllocation> = [
            { fundId: 2, percentage: 60 },
            { fundId: 3, percentage: 40 }
        ];

        expect(calcUnlevered(fundHoldings)).toEqual(expected);
    });

    it('should return correct unlevered portfolio of 50/50', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 1, percentage: 90 },
            { fundId: 2, percentage: -80 },
            { fundId: 3, percentage: 90 }
        ];

        const expected: Array<FundAllocation> = [
            { fundId: 1, percentage: 50 },
            { fundId: 3, percentage: 50 }
        ];

        expect(calcUnlevered(fundHoldings)).toEqual(expected);
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 2, percentage: 40 },
            { fundId: 1, percentage: 60 }
        ];

        const expected: Array<FundAllocation> = [
            { fundId: 1, percentage: 60 },
            { fundId: 2, percentage: 40 }
        ];

        expect(calcUnlevered(fundHoldings)).toEqual(expected);
    });

    it('should return correct unlevered portfolio of 100', () => {
        const fundHoldings: Array<FundAllocation> = [{ fundId: 1, percentage: 100 }];
        const expected: Array<FundAllocation> = [{ fundId: 1, percentage: 100 }];

        expect(calcUnlevered(fundHoldings)).toEqual(expected);
    });
});
