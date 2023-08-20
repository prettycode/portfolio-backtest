import FundSelectionTable from './Components/FundSelection/FundSelectionTable';

import './App.css';

function App() {
    return (
        <>
            <FundSelectionTable
                onCalculatePortfolios={(columnIndex, rows) => console.log(JSON.stringify({ columnIndex, rows }))}
            ></FundSelectionTable>
        </>
    );
}

export default App;
