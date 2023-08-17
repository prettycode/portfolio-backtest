import React, { useEffect, useState } from 'react';
import { getFundAnalysisForCustomFund } from '../../Fund/transformers/FundAnalysis/getFundAnalysisForCustomFund';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchMarketFunds } from '../../Fund/services/fetchMarketFunds';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import FundAnalysis from '../FundAnalysis/FundAnalysis';
import { fetchCustomFunds } from '../../Fund/services/fetchCustomFunds';
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

const FundSelectionTable: React.FC = () => {
    const createRow = (): FundAllocation => ({ fundId: '', percentage: 0 });
    const validRows = (): Array<FundAllocation> => rows.filter((row) => row.fundId !== '' && Number.isInteger(row.percentage));
    const sumRows = (rows?: Array<FundAllocation>): number => (rows || validRows()).reduce((sum, row) => sum + row.percentage, 0);

    const [funds, setFunds] = useState<Fund[]>([]);
    const [customFundAllocations, setCustomFundAllocations] = useState<Array<FundAllocation> | undefined>(undefined);
    const [rows, setRows] = useState<FundAllocation[]>(Array.from({ length: 5 }, createRow));

    const addRow = () => {
        setRows([...rows, createRow()]);
    };

    const calculate = () => {
        const completedRows = validRows();
        const sumOfPercentages = sumRows(completedRows);

        if (sumOfPercentages < 100) {
            alert(`The sum of the percentages (${sumOfPercentages}%) is less than 100%.`);
            return;
        }

        setCustomFundAllocations(completedRows);
    };

    useEffect(() => {
        (async () => setFunds([...(await fetchCustomFunds()), ...(await fetchMarketFunds())]))();
    }, []);

    return (
        <>
            <table className="table rounded" style={{ width: '480px' }}>
                <thead>
                    <tr>
                        <th scope="col" style={{ width: '100%' }}>
                            Assets
                        </th>
                        <th scope="col" style={{ whiteSpace: 'nowrap' }}>
                            Weight (%)
                        </th>
                        {/*<th scope="col" style={{ whiteSpace: 'nowrap' }}>
                            Weight ($)
                        </th>*/}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <span>
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
                                    className={'form-control'}
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
                            {/*<td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                <span style={{ paddingRight: '10px' }}>$</span>0.00
                            </td>*/}
                        </tr>
                    ))}
                    <tr>
                        <td>Total: {validRows().length} asset(s)</td>
                        <td style={{ textAlign: 'center' }}>{sumRows()}&thinsp;%</td>
                    </tr>
                </tbody>
            </table>

            <div className="clearfix">
                <button type="button" className="btn btn-outline-secondary float-start" onClick={addRow}>
                    Add Row
                </button>
                <button type="button" className="btn btn-outline-primary float-end" onClick={calculate}>
                    Calculate
                </button>
            </div>

            <div style={{ marginTop: '40px' }}>{customFundAllocations && <FundAnalysis fundAllocations={customFundAllocations} />}</div>
        </>
    );
};

export default FundSelectionTable;
