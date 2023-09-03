/* eslint-disable @typescript-eslint/no-unused-vars */

import FundSelectionTable, { UNSELECTED_FUND_FUNDID } from './Components/FundSelectionTable/FundSelectionTable';
import { FundSelectionTableState } from './Components/FundSelectionTable/FundSelectionTableState';
import './App.css';

const defaultTableState: FundSelectionTableState = {
    rows: [
        { fundId: UNSELECTED_FUND_FUNDID, percentage: [0, 0, 0] },
        { fundId: UNSELECTED_FUND_FUNDID, percentage: [0, 0, 0] },
        { fundId: UNSELECTED_FUND_FUNDID, percentage: [0, 0, 0] }
    ]
};

const manualTestingComparisons: Array<FundSelectionTableState> = [
    defaultTableState,
    {
        // 3-Month Money-Market
        rows: [
            { fundId: 'USFR', percentage: ['100', '', '', ''] },
            { fundId: 'TFLO', percentage: ['', '100', '', ''] },
            { fundId: 'FLOT', percentage: ['', '', '100', ''] },
            { fundId: 'SGOV', percentage: ['', '', '', '100'] }
        ]
    },
    {
        // 6-Month Reserve
        rows: [
            { fundId: 'ACWV', percentage: ['50', '40', '30'] },
            { fundId: 'VGSH', percentage: ['30', '40', '50'] },
            { fundId: 'GLD', percentage: ['20', '20', '20'] }
        ]
    },
    {
        // 50% Equity Core
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
        rows: [
            { fundId: 'Custom:NTSX', percentage: ['40', '26.7', '20'] },
            { fundId: 'Custom:GDE', percentage: ['20', '33.3', '40'] },
            { fundId: 'Custom:NTSI', percentage: ['20', '20', '20'] },
            { fundId: 'Custom:NTSE', percentage: ['20', '20', '20'] }
        ]
    },
    {
        // 10% Defensive Equity
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

    const everythingBagel = {
        rows: [
            // 90% Equity Core
            { fundId: 'AVUS', percentage: [50 * 0.9 * 0.3, 50 * 1.0 * 0.3] },
            { fundId: 'AVUV', percentage: [50 * 0.9 * 0.3, 50 * 1.0 * 0.3] },
            { fundId: 'AVDE', percentage: [50 * 0.9 * 0.1, 50 * 1.0 * 0.1] },
            { fundId: 'AVDV', percentage: [50 * 0.9 * 0.1, 50 * 1.0 * 0.1] },
            { fundId: 'AVEM', percentage: [50 * 0.9 * 0.1, 50 * 1.0 * 0.1] },
            { fundId: 'DGS', percentage: [50 * 0.9 * 0.1, 50 * 1.0 * 0.1] },
            { fundId: 'GOVZ', percentage: [50 * 0.1 * 1.0, 0] },

            // 40% Efficient Core
            // TODO why isn't not using 'Custom:' working here?
            { fundId: 'Custom:GDE', percentage: [40 * 0.333, 40 * 0.333] },
            { fundId: 'Custom:NTSX', percentage: [40 * 0.267, 40 * 0.267] },
            { fundId: 'Custom:NTSI', percentage: [40 * 0.2, 40 * 0.2] },
            { fundId: 'Custom:NTSE', percentage: [40 * 0.2, 40 * 0.2] },

            // 10% Defensive Equity
            { fundId: 'Custom:US Defensive', percentage: [10 * 0.9 * 0.6 * 1.0, 10 * 0.9 * 0.6 * 1.0] },
            { fundId: 'VEA' /* EFAV */, percentage: [10 * 0.9 * 0.4 * 0.5, 10 * 0.9 * 0.4 * 0.5] },
            { fundId: 'VWO' /* EEMV */, percentage: [10 * 0.9 * 0.4 * 0.5, 10 * 0.9 * 0.4 * 0.5] },
            { fundId: 'GOVZ', percentage: [10 * 0.1 * 1.0 * 1.0, 10 * 0.1 * 1.0 * 1.0] }
        ]
    };

    const efficientCores = {
        rows: [
            {
                fundId: 'Custom:GDE',
                percentage: ['30', '33.3', '60']
            },
            {
                fundId: 'Custom:NTSX',
                percentage: ['30', '26.7', '0']
            },
            {
                fundId: 'Custom:NTSI',
                percentage: ['20', '20', '20']
            },
            {
                fundId: 'Custom:NTSE',
                percentage: ['20', '20', '20']
            }
        ]
    };

    stateToLoad = {
        rows: [
            {
                fundId: 'Custom:GDE',
                percentage: ['30', 0, '0']
            },
            {
                fundId: 'Custom:NTSX',
                percentage: ['30', '0', '0']
            },
            {
                fundId: 'Custom:NTSI',
                percentage: ['20', '0', '0']
            },
            {
                fundId: 'Custom:NTSE',
                percentage: ['20', '0', '0']
            },
            {
                fundId: 'AVUV',
                percentage: [0, '60', '30']
            },
            {
                fundId: 'AVUS',
                percentage: [0, 0, '30']
            },
            {
                fundId: 'AVDV',
                percentage: [0, '20', '10']
            },
            {
                fundId: 'AVDE',
                percentage: [0, 0, '10']
            },
            {
                fundId: 'DGS',
                percentage: [0, '20', '10']
            },
            {
                fundId: 'AVEM',
                percentage: [0, 0, '10']
            }
        ]
        /*[
            {
                fundId: 'Custom:Global Efficient Core, Gilded',
                percentage: [100, 0, '66']
            },
            {
                fundId: 'AVUV',
                percentage: [0, 60, '20']
            },
            {
                fundId: 'AVDV',
                percentage: [0, 20, '7']
            },
            {
                fundId: 'VWO',
                percentage: [0, 20, '7']
            }
        ]*/
        /*[
            { fundId: 'Custom:Global Efficient Core, Gilded', percentage: [100, 0, 50] },
            { fundId: 'AVUV', percentage: [0, 60, 30] },
            { fundId: 'AVDV', percentage: [0, 20, 10] },
            { fundId: 'VWO', percentage: [0, 20, 10] }
        ]*/
    };

    return (
        <div style={{ marginTop: 40 }}>
            <FundSelectionTable
                state={stateToLoad}
                onCalculatePortfolios={(rows) => {
                    const currentState: Array<FundSelectionTableState> = [{ rows }];
                    const newSearch = new URLSearchParams({ state: JSON.stringify(currentState) }).toString();
                    console.log(newSearch, JSON.stringify(currentState, null, 4));
                }}
            ></FundSelectionTable>
        </div>
    );
}

export default App;
