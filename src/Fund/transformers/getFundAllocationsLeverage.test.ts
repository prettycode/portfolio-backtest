import { FundAllocation } from '../models/Fund/FundAllocation';
import { getFundAllocationsLeverage } from './getFundAllocationsLeverage';

describe('getFundAllocationsLeverage', () => {
    it('should throw an error if holdings do not add up to at least 100', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 1, percentage: 10 },
            { fundId: 2, percentage: 20 },
            { fundId: 3, percentage: -5 },
            { fundId: 4, percentage: 15 }
        ];

        expect(() => getFundAllocationsLeverage(fundHoldings)).toThrow();
    });

    it('should calculate 1.05 leverage', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 1, percentage: 50 },
            { fundId: 2, percentage: 50 },
            { fundId: 3, percentage: -5 },
            { fundId: 4, percentage: 5 }
        ];

        expect(getFundAllocationsLeverage(fundHoldings)).toBe(1.05);
    });

    it('should calculate 1.50 leverage', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 1, percentage: 90 },
            { fundId: 2, percentage: 60 },
            { fundId: 3, percentage: -50 }
        ];

        expect(getFundAllocationsLeverage(fundHoldings)).toBe(1.5);
    });

    it('should calculate 1.8 leverage', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 1, percentage: 90 },
            { fundId: 2, percentage: 90 },
            { fundId: 3, percentage: -80 }
        ];

        expect(getFundAllocationsLeverage(fundHoldings)).toBe(1.8);
    });

    it('should calculate 1.0 leverage', () => {
        const fundHoldings: Array<FundAllocation> = [{ fundId: 1, percentage: 100 }];

        expect(getFundAllocationsLeverage(fundHoldings)).toBe(1.0);
    });

    it('should calculate 1.0 leverage', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: 1, percentage: 50 },
            { fundId: 2, percentage: 50 }
        ];

        expect(getFundAllocationsLeverage(fundHoldings)).toBe(1.0);
    });
});
