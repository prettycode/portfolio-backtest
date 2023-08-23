import FundSelectionTable, { FundSelectionTableRow } from './Components/FundSelection/FundSelectionTable';
import './App.css';

function App() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stateDeserialized: { columnCount: number; rows: Array<FundSelectionTableRow> } = JSON.parse(
        decodeURIComponent(
            '%7B%22columnCount%22%3A4%2C%22rows%22%3A%5B%7B%22fundId%22%3A%22NTSX%22%2C%22percentage%22%3A%5B%2240%22%2C%2226.6%22%2C%2220%22%2C0%5D%7D%2C%7B%22fundId%22%3A%22GDE%22%2C%22percentage%22%3A%5B%2220%22%2C%2233.4%22%2C%2240%22%2C0%5D%7D%2C%7B%22fundId%22%3A%22NTSI%22%2C%22percentage%22%3A%5B%2220%22%2C%2220%22%2C%2220%22%2C0%5D%7D%2C%7B%22fundId%22%3A%22NTSE%22%2C%22percentage%22%3A%5B%2220%22%2C%2220%22%2C%2220%22%2C0%5D%7D%2C%7B%22fundId%22%3A%22%22%2C%22percentage%22%3A%5B0%2C0%2C%220%22%2C%22%22%5D%7D%5D%7D'
        )
    );

    return (
        <>
            <div style={{ marginTop: 40 }}>
                <FundSelectionTable
                    state={stateDeserialized}
                    onCalculatePortfolios={(columnCount, rows) => {
                        const newSearch = new URLSearchParams({ state: JSON.stringify({ columnCount, rows }) }).toString();
                        console.log(newSearch);
                    }}
                ></FundSelectionTable>
            </div>
        </>
    );
}

export default App;
