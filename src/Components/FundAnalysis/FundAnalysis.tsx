import React, { useEffect, useState } from 'react';
import { getFundAnalysisForCustomFund } from '../../Fund/transformers/FundAnalysis/getFundAnalysisForCustomFund';
import { FundAnalysis } from '../../Fund/models/FundAnalysis/FundAnalysis';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchFundByFundId } from '../../Fund/services/fetchFundByFundId';
import { PortfolioVisualizerLink } from './PortfolioVisualizerLink';
import { getComparisonBacktestUrl } from '../../Fund/utils/getBacktestUrl';

interface FundAnalysisProps {
    fundAllocations: Array<Array<FundAllocation>>;
}

const FundAnalysis: React.FC<FundAnalysisProps> = ({ fundAllocations }) => {
    const [fundAnalysis, setFundAnalysis] = useState<Array<FundAnalysis> | undefined>(undefined);
    const [fundLookupCache, setFundLookupCache] = useState<Record<string, Fund> | undefined>(undefined);
    const [comparisonBacktestUrl, setComparisonBacktestUrl] = useState<string | undefined>(undefined);
    const [comparisonDeleveredBacktestUrl, setComparisonDeleveredBacktestUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const analysis: Array<FundAnalysis> = await Promise.all(
                fundAllocations.map((portfolio) => getFundAnalysisForCustomFund(portfolio))
            );
            const cache: Record<string, Fund> = {};

            await Promise.all(
                /*fundAllocations
                    .flatMap((a) => a.map((holding) => holding.fundId))
                    .map(async (fundId) => (cache[fundId] = await fetchFundByFundId(fundId)))*/
                analysis
                    .flatMap((a) => a.flattened)
                    .map(async (holding) => (cache[holding.fundId] = await fetchFundByFundId(holding.fundId)))
            );

            setFundAnalysis(analysis);
            setFundLookupCache(cache);

            if (analysis.length > 1) {
                setComparisonBacktestUrl(await getComparisonBacktestUrl(analysis.map((a) => a.flattened)));
                setComparisonDeleveredBacktestUrl(await getComparisonBacktestUrl(analysis.map((a) => a.delevered)));
            } else {
                setComparisonBacktestUrl(undefined);
                setComparisonDeleveredBacktestUrl(undefined);
            }
        })();
    }, [fundAllocations]);

    return (
        <>
            <h3>Portoflio Analysis</h3>
            {(comparisonBacktestUrl || comparisonDeleveredBacktestUrl) && (
                <ul>
                    {' '}
                    {comparisonBacktestUrl && (
                        <li style={{ fontWeight: 500 }}>
                            Portfolio Decomposed Baktests&nbsp;
                            <PortfolioVisualizerLink url={comparisonBacktestUrl} />
                        </li>
                    )}
                    {/* TODO has bug where rows don't align */}
                    {comparisonDeleveredBacktestUrl && (
                        <li style={{ fontWeight: 500 }}>
                            Delevered Compositions Backtests&nbsp;
                            <PortfolioVisualizerLink url={comparisonDeleveredBacktestUrl} />
                        </li>
                    )}
                </ul>
            )}

            {fundAnalysis &&
                fundLookupCache &&
                fundAnalysis.map((analysis, portfolioIndex) => (
                    <div key={portfolioIndex} className="float-start" style={{ marginRight: 75 }}>
                        {/*<h4>
                            {portfolioIndex === 0 ? 'Portfolio' : <>&nbsp;</>}
                            <PortfolioVisualizerLink allocations={analysis.holdings} />
                        </h4>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th>Name</th>
                                    <th style={{ textAlign: 'right' }}>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.holdings.map((fund, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '1%', paddingRight: '25px' }}>{fundLookupCache[fund.fundId].tickerSymbol}</td>
                                        <td>{fundLookupCache[fund.fundId].name}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            {fund.percentage.toFixed(1)}%&nbsp;&nbsp;
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>*/}

                        <h4>
                            {portfolioIndex === 0 ? 'Portfolio Decomposed' : <>&nbsp;</>}
                            <PortfolioVisualizerLink allocations={analysis.flattened} className="float-end" />
                        </h4>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th>Name</th>
                                    <th style={{ textAlign: 'right' }}>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.flattened.map((fund, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '1%', paddingRight: '25px' }}>{fundLookupCache[fund.fundId].tickerSymbol}</td>
                                        <td>{fundLookupCache[fund.fundId].name}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            {fund.percentage.toFixed(1)}%&nbsp;&nbsp;
                                            {/*<FundAssetClassIcon assetClass={fundLookupCache[String(fund.fundId)].assetClass}></FundAssetClassIcon>*/}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h4>{portfolioIndex === 0 ? 'Portfolio Leverage' : <>&nbsp;</>}</h4>
                        <div style={{ marginBottom: '1rem' }}>{analysis.leverage.toFixed(2)}&times;</div>

                        <h4>
                            {portfolioIndex === 0 ? 'Delevered Composition' : <>&nbsp;</>}
                            <PortfolioVisualizerLink allocations={analysis.delevered} className="float-end" />
                        </h4>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th>Name</th>
                                    <th style={{ textAlign: 'right' }}>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.delevered.map((fund, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '1%', paddingRight: '15px' }}>
                                            {fundLookupCache[String(fund.fundId)].tickerSymbol}
                                        </td>
                                        <td>{fundLookupCache[String(fund.fundId)].name}</td>
                                        <td style={{ textAlign: 'right' }}>{fund.percentage.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h4>{portfolioIndex === 0 ? 'Portfolio Asset Classes' : <>&nbsp;</>}</h4>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Asset Class</th>
                                    <th style={{ textAlign: 'right' }}>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.decomposed.marketRegion &&
                                    Object.entries(analysis.decomposed.assetClass).map(([region, funds], index) => (
                                        <tr key={index}>
                                            <td>{region}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                {funds.reduce((total, fund) => total + fund.percentage, 0).toFixed(1)}%
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        <h4>
                            {portfolioIndex === 0 ? (
                                <>
                                    Portfolio Regions <span style={{ fontSize: 'smaller' }}>(All Asset Classes)</span>
                                </>
                            ) : (
                                <>&nbsp;</>
                            )}
                        </h4>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Region</th>
                                    <th style={{ textAlign: 'right' }}>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(analysis.decomposed.marketRegion).map(([region, funds], index) => (
                                    <tr key={index}>
                                        <td>{region}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            {funds.reduce((total, fund) => total + fund.percentage, 0).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {Object.entries(analysis.decomposed.assetByRegion).map(([assetClass, regions]) => {
                            const totalPercentage = Object.values(regions)
                                .flat()
                                .reduce((acc, fund) => acc + fund.percentage, 0);

                            return (
                                <React.Fragment key={assetClass}>
                                    <h4>{portfolioIndex === 0 ? `${assetClass} by Region` : <>&nbsp;</>}</h4>
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>{assetClass}</th>
                                                <th style={{ textAlign: 'right' }}>Weight</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {regions &&
                                                Object.entries(regions).map(([region, funds]) => (
                                                    <tr key={region}>
                                                        <td>{region}</td>
                                                        <td style={{ textAlign: 'right' }}>
                                                            {totalPercentage === 0 && <>{(0).toFixed(1)}</>}
                                                            {totalPercentage !== 0 &&
                                                                (
                                                                    (funds.reduce((acc, fund) => acc + fund.percentage, 0) /
                                                                        totalPercentage) *
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
                    </div>
                ))}
        </>
    );
};

export default FundAnalysis;
