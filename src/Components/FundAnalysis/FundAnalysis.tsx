import React, { useEffect, useState } from 'react';
import { getFundAnalysisForCustomFund } from '../../Fund/transformers/FundAnalysis/getFundAnalysisForCustomFund';
import { FundAnalysis } from '../../Fund/models/FundAnalysis/FundAnalysis';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchFundByFundId } from '../../Fund/services/fetchFundByFundId';
import { getFundFromFundAllocation } from '../../Fund/transformers/Fund/getFundsFromFundAllocations';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const generateBacktestUrl = async (allocations: Array<FundAllocation>): Promise<string> => {
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

type PortfolioVisualizerBacktestLinkProps = {
    allocations: Array<FundAllocation>;
};

const PortfolioVisualizerLink: React.FC<PortfolioVisualizerBacktestLinkProps> = ({ allocations }) => {
    const [url, setUrl] = useState<string | undefined>();

    useEffect(() => {
        (async () => setUrl(await generateBacktestUrl(allocations)))();
    });

    return (
        <>
            {url && (
                <span style={{ display: 'inline-block', float: 'right' }}>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open backtest in Portfolio Visualizer"
                        style={{
                            fontSize: '0.6em',
                            position: 'relative',
                            top: '-2px'
                        }}
                    >
                        <FontAwesomeIcon icon={faExternalLink} />
                    </a>
                </span>
            )}
        </>
    );
};

interface FundAnalysisProps {
    fundAllocations: Array<FundAllocation>;
}

const FundAnalysis: React.FC<FundAnalysisProps> = ({ fundAllocations }) => {
    const [fundAnalysis, setFundAnalysis] = useState<FundAnalysis | undefined>(undefined);
    const [fundLookupCache, setFundLookupCache] = useState<Record<string, Fund> | undefined>(undefined);

    useEffect(() => {
        (async () => {
            // TODO is this really needed?
            if (!fundAllocations?.length) {
                return;
            }

            const analysis: FundAnalysis = await getFundAnalysisForCustomFund(fundAllocations);
            const cache: Record<string, Fund> = {};

            await Promise.all(
                analysis.flattened.map(async (holding) => (cache[String(holding.fundId)] = await fetchFundByFundId(holding.fundId)))
            );

            setFundAnalysis(analysis);
            setFundLookupCache(cache);
        })();
    }, [fundAllocations]);

    return (
        <div style={{ textAlign: 'left' }}>
            {/* TODO: what we doing w/fundAnalysis.holdings */}

            <h3>Portfolio Decomposed {fundAnalysis?.flattened && <PortfolioVisualizerLink allocations={fundAnalysis.flattened} />}</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th style={{ textAlign: 'right' }}>Allocation</th>
                    </tr>
                </thead>
                <tbody>
                    {fundAnalysis &&
                        fundLookupCache &&
                        fundAnalysis.flattened.map((fund, index) => (
                            <tr key={index}>
                                <td style={{ width: '1%', paddingRight: '15px' }}>{fundLookupCache[String(fund.fundId)].tickerSymbol}</td>
                                <td>{fundLookupCache[String(fund.fundId)].name}</td>
                                <td style={{ textAlign: 'right' }}>{fund.percentage.toFixed(1)}%</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <h3>Portfolio Leverage</h3>
            <div>{fundAnalysis && fundAnalysis.leverage.toFixed(2)}&times;</div>

            <h3>Delevered Composition {fundAnalysis?.delevered && <PortfolioVisualizerLink allocations={fundAnalysis.delevered} />}</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Name</th>
                        <th style={{ textAlign: 'right' }}>Allocation</th>
                    </tr>
                </thead>
                <tbody>
                    {fundAnalysis &&
                        fundLookupCache &&
                        fundAnalysis.delevered.map((fund, index) => (
                            <tr key={index}>
                                <td style={{ width: '1%', paddingRight: '15px' }}>{fundLookupCache[String(fund.fundId)].tickerSymbol}</td>
                                <td>{fundLookupCache[String(fund.fundId)].name}</td>
                                <td style={{ textAlign: 'right' }}>{fund.percentage.toFixed(1)}%</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <h3>Portfolio Asset Classes</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Asset Class</th>
                        <th style={{ textAlign: 'right' }}>Total Allocation</th>
                    </tr>
                </thead>
                <tbody>
                    {fundAnalysis &&
                        fundAnalysis.decomposed.marketRegion &&
                        Object.entries(fundAnalysis.decomposed.assetClass).map(([region, funds], index) => (
                            <tr key={index}>
                                <td>{region}</td>
                                <td style={{ textAlign: 'right' }}>
                                    {funds.reduce((total, fund) => total + fund.percentage, 0).toFixed(1)}%
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <h3>Portfolio Regions (All Asset Classes)</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Region</th>
                        <th style={{ textAlign: 'right' }}>Total Allocation</th>
                    </tr>
                </thead>
                <tbody>
                    {fundAnalysis &&
                        fundAnalysis.decomposed.marketRegion &&
                        Object.entries(fundAnalysis.decomposed.marketRegion).map(([region, funds], index) => (
                            <tr key={index}>
                                <td>{region}</td>
                                <td style={{ textAlign: 'right' }}>
                                    {funds.reduce((total, fund) => total + fund.percentage, 0).toFixed(1)}%
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {fundAnalysis &&
                Object.entries(fundAnalysis.decomposed.assetByRegion).map(([assetClass, regions]) => {
                    const totalPercentage = Object.values(regions)
                        .flat()
                        .reduce((acc, fund) => acc + fund.percentage, 0);

                    return (
                        <React.Fragment key={assetClass}>
                            <h3>{assetClass} by Region</h3>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>{assetClass}</th>
                                        <th style={{ textAlign: 'right' }}>Total Allocation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {regions &&
                                        Object.entries(regions).map(([region, funds]) => (
                                            <tr key={region}>
                                                <td>{region}</td>
                                                <td style={{ textAlign: 'right' }}>
                                                    {(
                                                        (funds.reduce((acc, fund) => acc + fund.percentage, 0) / totalPercentage) *
                                                        100
                                                    ).toFixed(1)}
                                                    %
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </React.Fragment>
                    );
                })}

            <h3>TODO</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Asset Class</th>
                        <th>Market Region</th>
                        <th>Fund Name</th>
                        <th style={{ textAlign: 'right' }}>Allocation Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {fundAnalysis &&
                        Object.entries(fundAnalysis.decomposed.assetByRegion).map(([assetClass, regions]) =>
                            Object.entries(regions).map(([region, funds]) =>
                                funds.map((fund, index) => (
                                    <tr key={index}>
                                        {index === 0 && <td rowSpan={funds.length}>{assetClass}</td>}
                                        {index === 0 && <td rowSpan={funds.length}>{region}</td>}
                                        <td>{fund.name}</td>
                                        <td style={{ textAlign: 'right' }}>{fund.percentage.toFixed(2)}%</td>
                                    </tr>
                                ))
                            )
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default FundAnalysis;
