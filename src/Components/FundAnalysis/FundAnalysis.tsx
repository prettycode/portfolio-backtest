import React, { useEffect, useState } from 'react';
import { getFundAnalysisForCustomFund } from '../../Fund/transformers/FundAnalysis/getFundAnalysisForCustomFund';
import { FundAnalysis } from '../../Fund/models/FundAnalysis/FundAnalysis';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchFundByFundId } from '../../Fund/services/fetchFundByFundId';
import { PortfolioVisualizerLink } from './PortfolioVisualizerLink';

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
                                <td style={{ textAlign: 'right' }}>
                                    {fund.percentage.toFixed(1)}%&nbsp;&nbsp;
                                    {/*<FundAssetClassIcon assetClass={fundLookupCache[String(fund.fundId)].assetClass}></FundAssetClassIcon>*/}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/*<table className="table table-sm">
                <thead>
                    <tr>
                        <th>Asset Class</th>
                        <th>Region</th>
                        <th>Fund Name</th>
                        <th style={{ textAlign: 'right' }}>Allocation</th>
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
            </table>*/}

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
                        <th style={{ textAlign: 'right' }}>Allocation</th>
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
                        <th style={{ textAlign: 'right' }}>Allocation</th>
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
                                        <th style={{ textAlign: 'right' }}>Allocation</th>
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
        </div>
    );
};

export default FundAnalysis;
