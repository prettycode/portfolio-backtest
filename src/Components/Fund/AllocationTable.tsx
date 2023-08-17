import React, { useEffect, useState } from 'react';
import { getFundAnalysisForCustomFund } from '../../Fund/transformers/FundAnalysis/getFundAnalysisForCustomFund';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchMarketFunds } from '../../Fund/services/fetchMarketFunds';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import FundAnalysis from '../FundAnalysis/FundAnalysis';
import { fetchCustomFunds } from '../../Fund/services/fetchCustomFunds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FundSelectionDropdown } from './FundSelectionDropdown';

(async () =>
    console.log(
        await getFundAnalysisForCustomFund([
            { fundId: '7' /* NTSX */, percentage: 30 },
            { fundId: '8' /* GDE */, percentage: 30 },
            { fundId: '9', percentage: 20 },
            { fundId: '10', percentage: 20 }
        ])
    ))();

const AllocationTable: React.FC = () => {
    const [funds, setFunds] = useState<Fund[]>([]);
    const [customFundAllocations, setCustomFundAllocations] = useState<Array<FundAllocation> | undefined>(undefined);
    const [rows, setRows] = useState<FundAllocation[]>(
        Array.from({ length: 5 }, () => ({
            fundId: '',
            percentage: 0
        }))
    );

    const addRow = () => {
        setRows([...rows, { fundId: '', percentage: 0 }]);
    };

    const calculate = () => {
        const rowsWithValidEntries = rows.filter((row) => row.fundId !== '' && Number.isInteger(row.percentage));
        const sumOfPercentages = rowsWithValidEntries.reduce((sum, row) => sum + row.percentage, 0);

        if (sumOfPercentages < 100) {
            alert(`The sum of the percentages (${sumOfPercentages}%) is less than 100%.`);
            return;
        }

        const rowsToFundAllocations = rowsWithValidEntries.map((row) => ({
            fundId: row.fundId,
            percentage: row.percentage
        }));

        console.log('CALCULATE:', rowsToFundAllocations);

        setCustomFundAllocations(rowsToFundAllocations);
    };

    useEffect(() => {
        (async () => setFunds([...(await fetchCustomFunds()), ...(await fetchMarketFunds())]))();
    }, []);

    return (
        <>
            <table className="table table-light">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign: 'left', width: '100%' }}>
                            <FontAwesomeIcon icon={faChartPie} /> Assets
                        </th>
                        <th scope="col" style={{ whiteSpace: 'nowrap' }}>
                            Allocation (%)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <span style={{ textAlign: 'left' }}>
                                    <FundSelectionDropdown
                                        funds={funds}
                                        onFundSelected={(fundId: string) => {
                                            const newRows = [...rows];
                                            newRows[index].fundId = fundId;
                                            setRows(newRows);
                                        }}
                                    />
                                </span>
                            </td>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
                                    style={{ textAlign: 'center' }}
                                    value={row.percentage}
                                    onChange={(e) => {
                                        const newRows = [...rows];
                                        newRows[index].percentage = Number(e.target.value || 0);
                                        setRows(newRows);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-primary" onClick={addRow}>
                Add Row
            </button>
            <button className="btn btn-success" onClick={calculate}>
                Calculate
            </button>

            <div style={{ marginTop: '40px' }}>{customFundAllocations && <FundAnalysis fundAllocations={customFundAllocations} />}</div>
        </>
    );
};

export default AllocationTable;
