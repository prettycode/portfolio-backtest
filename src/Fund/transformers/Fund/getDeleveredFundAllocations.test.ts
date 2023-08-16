import { FundAllocation } from '../../models/Fund/FundAllocation';
import { getDeleveredFundAllocations } from './getDeleveredFundAllocations';

describe('getDeleveredFundAllocations', () => {
    it('should throw an error if holdings are missing', () => {
        const fundHoldings: Array<FundAllocation> = [];
        expect(() => getDeleveredFundAllocations(fundHoldings)).toThrow();
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: '1', percentage: -50 },
            { fundId: '2', percentage: 90 },
            { fundId: '3', percentage: 60 }
        ];

        const expected: Array<FundAllocation> = [
            { fundId: '2', percentage: 60 },
            { fundId: '3', percentage: 40 }
        ];

        expect(getDeleveredFundAllocations(fundHoldings)).toEqual(expected);
    });

    it('should return correct unlevered portfolio of 50/50', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: '1', percentage: 90 },
            { fundId: '2', percentage: -80 },
            { fundId: '3', percentage: 90 }
        ];

        const expected: Array<FundAllocation> = [
            { fundId: '1', percentage: 50 },
            { fundId: '3', percentage: 50 }
        ];

        expect(getDeleveredFundAllocations(fundHoldings)).toEqual(expected);
    });

    it('should return correct unlevered portfolio of 60/40', () => {
        const fundHoldings: Array<FundAllocation> = [
            { fundId: '2', percentage: 40 },
            { fundId: '1', percentage: 60 }
        ];

        const expected: Array<FundAllocation> = [
            { fundId: '1', percentage: 60 },
            { fundId: '2', percentage: 40 }
        ];

        expect(getDeleveredFundAllocations(fundHoldings)).toEqual(expected);
    });

    it('should return correct unlevered portfolio of 100', () => {
        const fundHoldings: Array<FundAllocation> = [{ fundId: '1', percentage: 100 }];
        const expected: Array<FundAllocation> = [{ fundId: '1', percentage: 100 }];

        expect(getDeleveredFundAllocations(fundHoldings)).toEqual(expected);
    });
});
