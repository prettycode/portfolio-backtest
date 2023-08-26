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

const manualTestingComparisons: Array<FundSelectionTableState> = [
    defaultTableState,
    {
        // 6-Month Reserve
        columnCount: 3,
        rows: [
            { fundId: 'VT', percentage: ['50', '40', '30'] },
            { fundId: 'VGSH', percentage: ['30', '40', '50'] },
            { fundId: 'GLD', percentage: ['20', '20', '20'] }
        ]
    },
    {
        // Global Efficient Core
        columnCount: 3,
        rows: [
            { fundId: 'NTSX', percentage: ['40', '26.7', '20'] },
            { fundId: 'GDE', percentage: ['20', '33.3', '40'] },
            { fundId: 'NTSI', percentage: ['20', '20', '20'] },
            { fundId: 'NTSE', percentage: ['20', '20', '20'] }
        ]
    }
];

function App() {
    let stateToLoad: FundSelectionTableState = manualTestingComparisons[2];
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
