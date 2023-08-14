import { Fund } from '../models/Fund/Fund';
import { calcUnlevered } from './calcUnlevered';

describe('calcUnlevered', () => {
    it('should throw an error if holdings are missing', () => {
        const fundHoldings: Array<Fund> = [];
        expect(() => calcUnlevered(fundHoldings)).toThrow();
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fundHoldings = [
            { id: 1, percentage: -50 },
            { id: 2, percentage: 90 },
            { id: 3, percentage: 60 }
        ];

        expect(calcUnlevered(fundHoldings)).toEqual([
            { id: 2, percentage: 60 },
            { id: 3, percentage: 40 }
        ]);
    });

    it('should return correct unlevered portfolio of 50/50', () => {
        const fundHoldings = [
            { id: 1, percentage: 90 },
            { id: 2, percentage: -80 },
            { id: 3, percentage: 90 }
        ];

        expect(calcUnlevered(fundHoldings)).toEqual([
            { id: 1, percentage: 50 },
            { id: 3, percentage: 50 }
        ]);
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fundHoldings = [
            { id: 2, percentage: 40 },
            { id: 1, percentage: 60 }
        ];

        expect(calcUnlevered(fundHoldings)).toEqual([
            { id: 1, percentage: 60 },
            { id: 2, percentage: 40 }
        ]);
    });

    it('should return correct unlevered portfolio of 100', () => {
        const fundHoldings = [{ id: 1, percentage: 100 }];

        expect(calcUnlevered(fundHoldings)).toEqual([{ id: 1, percentage: 100 }]);
    });
});
