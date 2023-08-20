import React, { useEffect, useState } from 'react';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchMarketFunds } from '../../Fund/services/fetchMarketFunds';
import { fetchCustomFunds } from '../../Fund/services/fetchCustomFunds';
import { FundSelectionDropdown } from './FundSelectionDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import FundAnalysis from '../FundAnalysis/FundAnalysis';
import cloneDeep from 'lodash.clonedeep';

type Row = {
    fundId: string;
    percentage: Array<string | number>;
};

interface FundSelectionTableProps {
    state?: {
        columnsCount: number;
        rows: Array<Row>;
    };
}

const FundSelectionTable: React.FC<FundSelectionTableProps> = ({ state }) => {
    const defaultFundId = '';
    const defaultColumnsCount = 3;
    const defaultRowsCount = 3;

    const createRow = (columnCountInRow: number): Row => ({ fundId: defaultFundId, percentage: new Array(columnCountInRow).fill(0) });
    const getColumnsCount = (): number => rows.reduce((max, row) => Math.max(max, row.percentage.length), 0);
    const sumColumn = (columnIndex: number): number => rows.reduce((sum, row) => sum + Number(row.percentage[columnIndex]), 0);
    const sumSelectedFunds = (): number => rows.reduce((sum, row) => sum + (row.fundId === defaultFundId ? 0 : 1), 0);

    const [funds, setFunds] = useState<Array<Fund>>([]);
    const [rows, setRows] = useState<Row[]>(
        state ? state.rows : Array.from({ length: defaultRowsCount }, () => createRow(defaultColumnsCount))
    );
    const [columnsCount, setColumnsCount] = useState<number>(state ? state.columnsCount : defaultColumnsCount);

    const [customPortfolios, setCustomPortfolios] = useState<Array<Array<FundAllocation>> | undefined>(undefined);

    // Load funds into state for lookup dropdown
    useEffect(() => {
        (async () => setFunds([...(await fetchCustomFunds()), ...(await fetchMarketFunds())]))();
    }, []);

    // Returns the current state of the table. Used to reload table via URL
    const getState = () => {
        return {
            columnsCount,
            rows: cloneDeep(rows)
        };
    };

    const onStateUpdated = () => {
        console.log('State changed', new Date().toISOString(), getState(), JSON.stringify(getState()));
    };

    const onAddRow = () => {
        setRows([...rows, createRow(columnsCount)]);
    };

    const onAddColumn = () => {
        const rowsShallowCopy = [...rows];
        rowsShallowCopy.forEach((row) => row.percentage.push(0));
        setColumnsCount(columnsCount + 1);
        setRows(rowsShallowCopy);
        onStateUpdated();
    };

    const onChangePercentage = (rowIndex: number, columnIndex: number, value: string) => {
        const newRows = [...rows];
        newRows[rowIndex].percentage[columnIndex] = value;
        setRows(newRows);
        onStateUpdated();
    };

    const onFundSelected = (rowIndex: number, fundId: string) => {
        const newRows = [...rows];
        newRows[rowIndex].fundId = fundId;
        setRows(newRows);
        onStateUpdated();
    };

    const onCalculate = () => {
        const portfolios: Array<Array<FundAllocation>> = [];

        Array.from({ length: getColumnsCount() }, (_, index) => index).forEach((columnIndex) => {
            // Column = portfolio

            // If portfolio doesn't add up to 100, can't calculate this portfolio--skip adding it
            if (sumColumn(columnIndex) !== 100) {
                return;
            }

            // If portfolio contains any fund that isn't selected *and* has a non-zero percentage, can't calculate this portfolio--skip adding it
            if (
                rows.some(
                    (row) =>
                        row.fundId === defaultFundId &&
                        !Number.isNaN(Number(row.percentage[columnIndex])) &&
                        Number(row.percentage[columnIndex]) !== 0
                )
            ) {
                return;
            }

            // For each portfolio, take all the rows that have funds selected and real numbers for percentages
            const portfolio: Array<FundAllocation> = rows
                .filter((row) => row.fundId !== defaultFundId && !Number.isNaN(Number(row.percentage[columnIndex])))
                .map((row) => ({ fundId: row.fundId, percentage: Number(row.percentage[columnIndex]) }));

            portfolios.push(portfolio);
        });

        setCustomPortfolios(portfolios);
    };

    return (
        <>
            <table className="table rounded" style={{ width: 840 }}>
                <thead>
                    <tr>
                        <th scope="col" style={{ width: '100%' }}>
                            Assets
                        </th>
                        {Array(getColumnsCount())
                            .fill(null)
                            .map((_, index) => (
                                <th key={index} scope="col" style={{ whiteSpace: 'nowrap' }}>
                                    Weight (%)
                                </th>
                            ))}
                        <th>
                            <button title="Add new column" className="btn btn-xs" style={{ padding: '2px 4px' }} onClick={onAddColumn}>
                                <FontAwesomeIcon icon={faPlus} fixedWidth={true} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>
                                <FundSelectionDropdown
                                    funds={funds}
                                    onFundSelected={(fundId: string) => onFundSelected(rowIndex, fundId)}
                                />
                            </td>
                            {row.percentage.map((percentageInColumn, columnIndex) => (
                                <td key={columnIndex}>
                                    <input
                                        className={'form-control'}
                                        style={{ textAlign: 'center' }}
                                        type="text"
                                        value={percentageInColumn.toString()}
                                        onChange={(e) => onChangePercentage(rowIndex, columnIndex, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td>Total: {sumSelectedFunds()} asset(s)</td>
                        {Array.from({ length: getColumnsCount() }, (_, columnIndex) => (
                            <td key={columnIndex} style={{ textAlign: 'center' }}>
                                {sumColumn(columnIndex)}&thinsp;%
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <div className="clearfix">
                <button type="button" className="btn btn-sm btn-outline-secondary float-start" onClick={onAddRow}>
                    Add Row
                </button>
                <button type="button" className="btn btn-sm btn-outline-primary float-end" onClick={onCalculate}>
                    Calculate
                </button>
            </div>

            {customPortfolios && (
                <div style={{ marginTop: '40px' }}>
                    <FundAnalysis fundAllocations={customPortfolios} />
                </div>
            )}
        </>
    );
};

export default FundSelectionTable;
