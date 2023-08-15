import React, { useEffect, useState } from 'react';
import { getFundAnalysis } from './Fund/transformers/getFundAnalysis';
import { Fund } from './Fund/models/Fund/Fund';
import { fetchMarketFunds } from './Fund/services/fetchMarketFunds';
import { FundAllocation } from './Fund/models/Fund/FundAllocation';

const manualTestingFund: Fund = {
    fundId: -1,
    name: 'Gilded Efficient Core',
    description: '',
    percentage: 100,
    type: 'Custom',
    holdings: [
        {
            // NTSX
            fundId: 7,
            percentage: 30
        },
        {
            // GDE
            fundId: 8,
            percentage: 30
        },
        {
            fundId: 9,
            percentage: 20
        },
        {
            fundId: 10,
            percentage: 20
        }
    ]
};

(async () => console.log(await getFundAnalysis(manualTestingFund)))();

const AllocationTable: React.FC = () => {
    const [funds, setFunds] = useState<Fund[]>([]);
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
        alert('Calculate');
    };

    useEffect(() => {
        (async () => setFunds([manualTestingFund, ...(await fetchMarketFunds())]))();
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
                            Allocation %
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
                                        <option key={idx} value={fund.name} />
                                    ))}
                                </datalist>
                            </td>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
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
        </>
    );
};

export default AllocationTable;
