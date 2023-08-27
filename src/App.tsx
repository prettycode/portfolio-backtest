import FundSelectionTable, { FundSelectionTableState } from './Components/FundSelection/FundSelectionTable';
import './App.css';

const defaultTableState: FundSelectionTableState = {
    columnCount: 3,
    rows: [
        { fundId: '-1', percentage: [0, 0, 0] },
        { fundId: '-1', percentage: [0, 0, 0] },
        { fundId: '-1', percentage: [0, 0, 0] }
    ]
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const manualTestingComparisons: Array<FundSelectionTableState> = [
    defaultTableState,
    {
        // 3-Month Money-Market
        columnCount: 4,
        rows: [
            { fundId: 'USFR', percentage: ['100', '', '', ''] },
            { fundId: 'TFLO', percentage: ['', '100', '', ''] },
            { fundId: 'FLOT', percentage: ['', '', '100', ''] },
            { fundId: 'SGOV', percentage: ['', '', '', '100'] }
        ]
    },
    {
        // 6-Month Reserve
        columnCount: 3,
        rows: [
            { fundId: 'ACWV', percentage: ['50', '40', '30'] },
            { fundId: 'VGSH', percentage: ['30', '40', '50'] },
            { fundId: 'GLD', percentage: ['20', '20', '20'] }
        ]
    },
    {
        // 50% Equity Core
        columnCount: 3,
        rows: [
            { fundId: 'AVUS', percentage: ['30', '', ''] },
            { fundId: 'AVUV', percentage: ['30', '', ''] },
            { fundId: 'AVDE', percentage: ['10', '', ''] },
            { fundId: 'AVDV', percentage: ['10', '', ''] },
            { fundId: 'AVEM', percentage: ['10', '', ''] },
            { fundId: 'DGS', percentage: ['10', '', ''] }
        ]
    },
    {
        // 40% Efficient Core
        columnCount: 3,
        rows: [
            { fundId: 'NTSX', percentage: ['40', '26.7', '20'] },
            { fundId: 'GDE', percentage: ['20', '33.3', '40'] },
            { fundId: 'NTSI', percentage: ['20', '20', '20'] },
            { fundId: 'NTSE', percentage: ['20', '20', '20'] }
        ]
    },
    {
        // 10% Defensive Equity
        columnCount: 3,
        rows: [
            { fundId: 'VPU', percentage: ['24.5', (24.5 / 90) * 100, 30] },
            { fundId: 'KXI', percentage: ['23', (23 / 90) * 100, 35] },
            { fundId: 'IXJ', percentage: ['22.5', (22.5 / 90) * 100, 35] },
            { fundId: 'EFAV', percentage: ['10', (10 / 90) * 100, ''] },
            { fundId: 'EEMV', percentage: ['10', (10 / 90) * 100, ''] },
            { fundId: 'GOVZ', percentage: ['10', '', ''] }
        ]
    }
];

function App() {
    let stateToLoad: FundSelectionTableState = defaultTableState;
    const stateDeserialized: FundSelectionTableState | undefined = (() => {
        try {
            // TODO: Validate (using Zod?) that the state is a valid FundSelectionTableState
            return JSON.parse(decodeURIComponent(location.search));
        } catch (e) {
            return undefined;
        }
    })();

    if (stateDeserialized) {
        stateToLoad = stateDeserialized;
    }

    return (
        <>
            <div style={{ marginTop: 40 }}>
                <FundSelectionTable
                    state={stateToLoad}
                    onCalculatePortfolios={(columnCount, rows) => {
                        const currentState: Array<FundSelectionTableState> = [{ columnCount, rows }];
                        const newSearch = new URLSearchParams({ state: JSON.stringify(currentState) }).toString();
                        console.log(newSearch, JSON.stringify(currentState, null, 4));
                    }}
                ></FundSelectionTable>
            </div>
        </>
    );
}

export default App;
