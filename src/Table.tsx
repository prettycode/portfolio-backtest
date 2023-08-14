import React, { useState } from 'react';
import { fetchCustomFunds } from './Fund/services/fetchCustomFunds';
import { calcFundAnalysis } from './Fund/transform/calcFundAnalysis';

// Sample funds to populate the dropdown
const funds = ['Fund A', 'Fund B', 'Fund C', 'Fund D', 'Fund E'];

const customFund = (await fetchCustomFunds()).find((fund) => fund.id === 13);

if (!customFund) {
    throw new Error();
}

console.log(await calcFundAnalysis(customFund));

const AllocationTable: React.FC = () => {
    const [rows, setRows] = useState(
        Array.from({ length: 5 }, () => ({
            fund: '',
            allocation: 0
        }))
    );

    const addRow = () => {
        setRows([...rows, { fund: '', allocation: 0 }]);
    };

    const calculate = () => {
        alert('Calculate');
    };

    return (
        <div className="container" style={{ fontFamily: 'Arial', padding: '10px' }}>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', width: '100%', borderBottom: '1px solid #ccc' }}>Fund</th>
                        <th style={{ borderBottom: '1px solid #ccc', whiteSpace: 'nowrap' }}>Allocation %</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>
                                <input
                                    className="form-control"
                                    list="funds"
                                    style={{ width: '100%' }}
                                    value={row.fund}
                                    onChange={(e) => {
                                        const newRows = [...rows];
                                        newRows[index].fund = e.target.value;
                                        setRows(newRows);
                                    }}
                                />
                                <datalist id="funds">
                                    {funds.map((fund, idx) => (
                                        <option key={idx} value={fund} />
                                    ))}
                                </datalist>
                            </td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={row.allocation}
                                    onChange={(e) => {
                                        const newRows = [...rows];
                                        newRows[index].allocation = Number(e.target.value);
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
        </div>
    );
};

export default AllocationTable;
