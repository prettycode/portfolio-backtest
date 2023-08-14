import { calcLeverage } from './calcLeverage';

describe('calcLeverage', () => {
    it('should throw an error if holdings do not add up to at least 100', () => {
        const fundHoldings = [
            { id: 1, percentage: 10 },
            { id: 2, percentage: 20 },
            { id: 3, percentage: -5 },
            { id: 4, percentage: 15 }
        ];

        expect(() => calcLeverage(fundHoldings)).toThrow();
    });

    it('should calculate 1.05 leverage', () => {
        const fundHoldings = [
            { id: 1, percentage: 50 },
            { id: 2, percentage: 50 },
            { id: 3, percentage: -5 },
            { id: 4, percentage: 5 }
        ];

        expect(calcLeverage(fundHoldings)).toBe(1.05);
    });

    it('should calculate 1.50 leverage', () => {
        const fundHoldings = [
            { id: 1, percentage: 90 },
            { id: 2, percentage: 60 },
            { id: 3, percentage: -50 }
        ];

        expect(calcLeverage(fundHoldings)).toBe(1.5);
    });

    it('should calculate 1.8 leverage', () => {
        const fundHoldings = [
            { id: 1, percentage: 90 },
            { id: 2, percentage: 90 },
            { id: 3, percentage: -80 }
        ];

        expect(calcLeverage(fundHoldings)).toBe(1.8);
    });

    it('should calculate 1.0 leverage', () => {
        const fundHoldings = [{ id: 1, percentage: 100 }];

        expect(calcLeverage(fundHoldings)).toBe(1.0);
    });

    it('should calculate 1.0 leverage', () => {
        const fundHoldings = [
            { id: 1, percentage: 50 },
            { id: 2, percentage: 50 }
        ];

        expect(calcLeverage(fundHoldings)).toBe(1.0);
    });
});
