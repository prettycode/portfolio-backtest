import { calcUnlevered } from './calcUnlevered';

describe('calcUnlevered', () => {
    it('should throw an error if holdings are missing', () => {
        const fund = {
            id: 0,
            percentage: 100,
            holdings: []
        };
        expect(() => calcUnlevered(fund)).toThrow();
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fund = {
            id: 0,
            percentage: 100,
            holdings: [
                { id: 1, percentage: -50 },
                { id: 2, percentage: 90 },
                { id: 3, percentage: 60 }
            ]
        };
        expect(calcUnlevered(fund)).toEqual([
            { id: 2, percentage: 60 },
            { id: 3, percentage: 40 }
        ]);
    });

    it('should return correct unlevered portfolio of 50/50', () => {
        const fund = {
            id: 0,
            percentage: 100,
            holdings: [
                { id: 1, percentage: 90 },
                { id: 2, percentage: -80 },
                { id: 3, percentage: 90 }
            ]
        };
        expect(calcUnlevered(fund)).toEqual([
            { id: 1, percentage: 50 },
            { id: 3, percentage: 50 }
        ]);
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fund = {
            id: 0,
            percentage: 100,
            holdings: [
                { id: 2, percentage: 40 },
                { id: 1, percentage: 60 }
            ]
        };
        expect(calcUnlevered(fund)).toEqual([
            { id: 1, percentage: 60 },
            { id: 2, percentage: 40 }
        ]);
    });

    it('should return correct unlevered portfolio of 100', () => {
        const fund = {
            id: 0,
            percentage: 100,
            holdings: [{ id: 1, percentage: 100 }]
        };
        expect(calcUnlevered(fund)).toEqual([{ id: 1, percentage: 100 }]);
    });
});
