import React, { useEffect, useState } from 'react';
import { getFundAnalysis } from '../../Fund/transformers/FundAnalysis/getFundAnalysis';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchMarketFunds } from '../../Fund/services/fetchMarketFunds';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import FundAnalysis from '../FundAnalysis/FundAnalysis';
import { fetchCustomFunds } from '../../Fund/services/fetchCustomFunds';

(async () =>
    console.log(
        await getFundAnalysis(
            {
                fundId: -1,
                name: 'Efficient Core, Gilded',
                description: 'Efficient Core, Gilded',
                percentage: 100,
                type: 'Custom',
                holdings: [
                    { fundId: 7 /* NTSX */, percentage: 30 },
                    { fundId: 8 /* GDE */, percentage: 30 },
                    { fundId: 9, percentage: 20 },
                    { fundId: 10, percentage: 20 }
                ]
            }.holdings
        )
    ))();

const AllocationTable: React.FC = () => {
    const [funds, setFunds] = useState<Fund[]>([]);
    const [customFundAllocations, setCustomFundAllocations] = useState<Array<FundAllocation>>([]);
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
        const rowsWithFundIdsAndPercentages = rows.filter((row) => row.fundId !== '' && Number.isInteger(row.percentage));
        const sumOfPercentages = rowsWithFundIdsAndPercentages.reduce((sum, row) => sum + row.percentage, 0);

        if (sumOfPercentages < 100) {
            alert(`The sum of the percentages (${sumOfPercentages}%) is less than 100%.`);
            return;
        }

        const rowsToFundAllocations = rowsWithFundIdsAndPercentages.map((row) => ({
            fundId: Number(row.fundId),
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
                            Fund
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
                                <input
                                    className="form-control"
                                    list="funds"
                                    style={{ width: '100%' }}
                                    value={row.fundId}
                                    placeholder="Search for asset..."
                                    onChange={(e) => {
                                        const newRows = [...rows];
                                        newRows[index].fundId = e.target.value;
                                        setRows(newRows);
                                    }}
                                />
                                <datalist id="funds">
                                    {funds.map((fund: Fund, idx) => (
                                        <option key={idx} data-value={fund.fundId} value={fund.fundId} label={fund.description} />
                                    ))}
                                </datalist>
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

            {customFundAllocations.length && <FundAnalysis fundAllocations={customFundAllocations} />}
        </>
    );
};

export default AllocationTable;
