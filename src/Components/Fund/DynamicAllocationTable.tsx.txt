import React, { useEffect, useState } from 'react';
import { Fund } from '../../Fund/models/Fund/Fund';
import { getFundAnalysis } from '../../Fund/transformers/FundAnalysis/getFundAnalysis';
import { fetchMarketFunds } from '../../Fund/services/fetchMarketFunds';

interface FundAllocation {
    fundId: string;
    percentages: number[];
}

const manualTestingFund: Fund = {
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
};

(async () => console.log(await getFundAnalysis(manualTestingFund)))();

const DynamicAllocationTable: React.FC = () => {
    const [funds, setFunds] = useState<Fund[]>([]);
    const [rows, setRows] = useState<FundAllocation[]>(
        Array.from({ length: 5 }, () => ({
            fundId: '',
            percentages: [0, 0, 0] // Start with two allocation columns
        }))
    );

    const addRow = () => {
        setRows([...rows, { fundId: '', percentages: new Array(rows[0]?.percentages.length || 2).fill(0) }]);
    };

    const addAllocationColumn = () => {
        setRows(
            rows.map((row) => ({
                ...row,
                percentages: [...row.percentages, 0]
            }))
        );
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
                        {rows[0]?.percentages.map((_, index) => (
                            <th key={index} scope="col" style={{ whiteSpace: 'nowrap' }}>
                                Porfolio {index + 1} (%)
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <input
                                    className="form-control"
                                    list="funds"
                                    style={{ width: '100%' }}
                                    value={row.fundId}
                                    placeholder="Search for asset..."
                                    onChange={(e) => {
                                        const newRows = [...rows];
                                        newRows[rowIndex].fundId = e.target.value;
                                        setRows(newRows);
                                    }}
                                />
                                <datalist id="funds">
                                    {funds.map((fund: Fund, idx) => (
                                        <option key={idx} value={fund.name} />
                                    ))}
                                </datalist>
                            </td>
                            {row.percentages.map((percentage, columnIndex) => (
                                <td key={columnIndex}>
                                    <input
                                        className="form-control"
                                        type="number"
                                        style={{ textAlign: 'center' }}
                                        value={percentage}
                                        onChange={(e) => {
                                            const newRows = [...rows];
                                            newRows[rowIndex].percentages[columnIndex] = Number(e.target.value || 0);
                                            setRows(newRows);
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={addRow}>
                Add Row
            </button>
            <button className="btn btn-warning" onClick={addAllocationColumn}>
                Add Allocation Column
            </button>
            <button className="btn btn-success" onClick={calculate}>
                Calculate
            </button>
        </>
    );
};

export default DynamicAllocationTable;
