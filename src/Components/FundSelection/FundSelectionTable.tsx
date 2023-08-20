import React, { useEffect, useState } from 'react';
import { Fund } from '../../Fund/models/Fund/Fund';
import { fetchMarketFunds } from '../../Fund/services/fetchMarketFunds';
import { fetchCustomFunds } from '../../Fund/services/fetchCustomFunds';
import { FundSelectionDropdown } from './FundSelectionDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import FundAnalysis from '../FundAnalysis/FundAnalysis';
import cloneDeep from 'lodash.clonedeep';
import './FundSelectionTable.css';

export type FundSelectionTableRow = {
    fundId: string;
    percentage: Array<string | number>;
};

export interface FundSelectionTableProps {
    onCalculatePortfolios: (columnCount: number, rows: Array<FundSelectionTableRow>) => void;
    state?: {
        columnCount: number;
        rows: Array<FundSelectionTableRow>;
    };
}

const FundSelectionTable: React.FC<FundSelectionTableProps> = ({ state, onCalculatePortfolios }) => {
    const defaultFundId = '';
    const defaultColumnsCount = 3;
    const defaultRowsCount = 3;

    const createRow = (columnCountInRow: number): FundSelectionTableRow => ({
        fundId: defaultFundId,
        percentage: new Array(columnCountInRow).fill(0)
    });
    const getColumnsCount = (): number => rows.reduce((max, row) => Math.max(max, row.percentage.length), 0);
    const sumColumn = (columnIndex: number): number => rows.reduce((sum, row) => sum + Number(row.percentage[columnIndex]), 0);
    const sumSelectedFunds = (): number => rows.reduce((sum, row) => sum + (row.fundId === defaultFundId ? 0 : 1), 0);

    const [funds, setFunds] = useState<Array<Fund>>([]);
    const [rows, setRows] = useState<FundSelectionTableRow[]>(
        state ? state.rows : Array.from({ length: defaultRowsCount }, () => createRow(defaultColumnsCount))
    );
    const [columnsCount, setColumnsCount] = useState<number>(state ? state.columnCount : defaultColumnsCount);

    const [customPortfolios, setCustomPortfolios] = useState<Array<Array<FundAllocation>> | undefined>(undefined);

    // Load funds into state for lookup dropdown
    useEffect(() => {
        (async () => setFunds([...(await fetchCustomFunds()), ...(await fetchMarketFunds())]))();
    }, []);

    const onAddRow = () => {
        setRows([...rows, createRow(columnsCount)]);
    };

    const onClear = () => {
        setRows(Array.from({ length: rows.length }, () => createRow(columnsCount)));
    };

    const onReset = () => {
        setColumnsCount(defaultColumnsCount);
        setRows(Array.from({ length: defaultRowsCount }, () => createRow(defaultColumnsCount)));
    };

    const onAddColumn = () => {
        const rowsShallowCopy = [...rows];
        rowsShallowCopy.forEach((row) => row.percentage.push(0));
        setColumnsCount(columnsCount + 1);
        setRows(rowsShallowCopy);
    };

    const onChangePercentage = (rowIndex: number, columnIndex: number, value: string) => {
        const newRows = [...rows];
        newRows[rowIndex].percentage[columnIndex] = value;
        setRows(newRows);
    };

    const onFundSelected = (rowIndex: number, fundId: string) => {
        const newRows = [...rows];
        newRows[rowIndex].fundId = fundId;
        setRows(newRows);
    };

    const onMoveRowUp = (rowIndex: number) => {
        if (rowIndex === 0) {
            throw new Error('Cannot move the first row up.');
        }

        const newRows = [...rows];
        const tempRow = newRows[rowIndex];
        newRows[rowIndex] = newRows[rowIndex - 1];
        newRows[rowIndex - 1] = tempRow;
        setRows(newRows);
    };

    const onMoveRowDown = (rowIndex: number) => {
        if (rowIndex === rows.length - 1) {
            throw new Error('Cannot move the last row down.');
        }

        const newRows = [...rows];
        const tempRow = newRows[rowIndex];
        newRows[rowIndex] = newRows[rowIndex + 1];
        newRows[rowIndex + 1] = tempRow;
        setRows(newRows);
    };

    const onCalculate = () => {
        const portfolios: Array<Array<FundAllocation>> = [];

        Array.from({ length: getColumnsCount() }, (_, index) => index).forEach((columnIndex) => {
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
        onCalculatePortfolios(columnsCount, cloneDeep(rows));
    };

    return (
        <>
            <h3>Custom Portfolios</h3>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th></th>
                        <th>Load Comparison:</th>
                        <th className="text-center" colSpan={columnsCount}>
                            Weight (%) in Portfolios
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th scope="col" style={{ width: '100%' }}>
                            Assets
                        </th>
                        {Array.from({ length: columnsCount }).map((_, index) => (
                            <th key={index} className="text-center">
                                P{index + 1}
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
                            <td style={{ padding: 0, verticalAlign: 'middle' }}>
                                {rowIndex === rows.length - 1 && (
                                    <button title="Add new row" className="btn btn-xs" style={{ padding: '2px 4px' }} onClick={onAddRow}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                )}
                                {rows.length > 1 && !(rowIndex === rows.length - 1) && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%'
                                        }}
                                    >
                                        {rowIndex !== 0 && (
                                            <button
                                                className="btn btn-xs"
                                                style={{ padding: '0 4px' }}
                                                onClick={() => onMoveRowUp(rowIndex)}
                                            >
                                                <FontAwesomeIcon icon={faChevronUp} />
                                            </button>
                                        )}
                                        {rowIndex !== rows.length - 1 && (
                                            <button
                                                className="btn btn-xs"
                                                style={{ padding: '0 4px' }}
                                                onClick={() => onMoveRowDown(rowIndex)}
                                            >
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </td>

                            <td>
                                <FundSelectionDropdown
                                    funds={funds}
                                    selectedFundId={row.fundId}
                                    onFundSelected={(fundId: string) => onFundSelected(rowIndex, fundId)}
                                />
                            </td>
                            {row.percentage.map((percentageInColumn, columnIndex) => (
                                <td key={columnIndex}>
                                    <input
                                        className="form-control"
                                        style={{ textAlign: 'center', width: 65 }}
                                        type="text"
                                        value={percentageInColumn.toString()}
                                        onChange={(e) => onChangePercentage(rowIndex, columnIndex, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td>Total: {sumSelectedFunds()} asset(s)</td>
                        {Array.from({ length: getColumnsCount() }, (_, columnIndex) => (
                            <td key={columnIndex} style={{ textAlign: 'center' }}>
                                {sumColumn(columnIndex)}&thinsp;%
                            </td>
                        ))}
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td colSpan={getColumnsCount() - 1}>
                            <div className="clearfix">
                                <button type="button" className="btn btn-sm btn-outline-secondary float-start me-1" onClick={onAddRow}>
                                    Add Row
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-secondary float-start me-1" onClick={onAddColumn}>
                                    Add Column
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-danger float-start me-1" onClick={onClear}>
                                    Clear
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger  btn-outline-secondary float-start me-1"
                                    onClick={onReset}
                                >
                                    Reset
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-primary float-start me-1" onClick={onCalculate}>
                                    Calculate
                                </button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>

            {customPortfolios && (
                <div style={{ marginTop: '40px' }}>
                    <FundAnalysis fundAllocations={customPortfolios} />
                </div>
            )}
        </>
    );
};

export default FundSelectionTable;
