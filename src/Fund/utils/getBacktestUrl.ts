import { FundAllocation } from '../models/Fund/FundAllocation';
import { getFundFromFundAllocation } from '../transformers/Fund/getFundsFromFundAllocations';

export const getBacktestUrl = async (allocations: Array<FundAllocation>): Promise<string> => {
    let url =
        'https://www.portfoliovisualizer.com/backtest-portfolio?s=y&timePeriod=2&startYear=1985&firstMonth=1&endYear=2023&lastMonth=12&calendarAligned=false&includeYTD=false&initialAmount=10000&annualOperation=0&annualAdjustment=0&inflationAdjusted=true&annualPercentage=0.0&frequency=4&rebalanceType=1&absoluteDeviation=5.0&relativeDeviation=25.0&leverageType=0&leverageRatio=0.0&debtAmount=0&debtInterest=0.0&maintenanceMargin=25.0&leveragedBenchmark=false&reinvestDividends=true&showYield=false&showFactors=false&factorModel=3&benchmark=VFINX&portfolioNames=true&portfolioName1=Custom&portfolioName2=Example&portfolioName3=Example';

    const allocationFunds = await getFundFromFundAllocation(allocations);

    if (allocationFunds.some((fund) => fund.type === 'Custom')) {
        throw new Error('Cannot generate Portfolio Visualizer backtest link for custom fund.');
    }

    allocations.forEach((allocation, index) => {
        const fund = allocationFunds.find((fund) => fund.fundId === allocation.fundId);

        if (!fund) {
            throw new Error('Could not look up fund ticker.');
        }

        url += `&symbol${index + 1}=${fund.tickerSymbol}&allocation${index + 1}_1=${allocation.percentage}`;
    });

    return url;
};

export const getComparisonBacktestUrl = async (portfolios: Array<Array<FundAllocation>>): Promise<string> => {
    let url =
        'https://www.portfoliovisualizer.com/backtest-portfolio?s=y&timePeriod=2&startYear=1985&firstMonth=1&endYear=2023&lastMonth=12&calendarAligned=false&includeYTD=false&initialAmount=10000&annualOperation=0&annualAdjustment=0&inflationAdjusted=true&annualPercentage=0.0&frequency=4&rebalanceType=1&absoluteDeviation=5.0&relativeDeviation=25.0&leverageType=0&leverageRatio=0.0&debtAmount=0&debtInterest=0.0&maintenanceMargin=25.0&leveragedBenchmark=false&reinvestDividends=true&showYield=false&showFactors=false&factorModel=3&benchmark=VFINX';

    for (let portfolioIndex = 0; portfolioIndex < portfolios.length; portfolioIndex++) {
        const allocations = portfolios[portfolioIndex];
        const allocationFunds = await getFundFromFundAllocation(allocations);

        if (allocationFunds.some((fund) => fund.type === 'Custom')) {
            throw new Error('Cannot generate Portfolio Visualizer backtest link for custom fund.');
        }

        for (let index = 0; index < allocations.length; index++) {
            const allocation = allocations[index];
            const fund = allocationFunds.find((fund) => fund.fundId === allocation.fundId);

            if (!fund) {
                throw new Error('Could not look up fund ticker.');
            }

            url += `&symbol${index + 1}=${fund.tickerSymbol}&allocation${index + 1}_${portfolioIndex + 1}=${allocation.percentage}`;
        }
    }

    return url;
};
