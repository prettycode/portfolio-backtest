const sortFundsDescending = (funds) => funds.sort((a, b) => b.percentage - a.percentage);

const generateAggregatePortfolio = (portfolio) => {
    let expandedHoldings = [];

    function expandHoldings(holdings, weight) {
        for (const holding of holdings) {
            let fund = marketFunds.find((f) => f.id === holding.id) || customPortfolios.find((f) => f.id === holding.id);

            if (fund && fund.holdings.length > 0) {
                expandHoldings(fund.holdings, (holding.percentage * weight) / 100);
            } else {
                expandedHoldings.push({
                    ...fund,
                    percentage: (holding.percentage * weight) / 100
                });
            }
        }
    }

    expandHoldings(portfolio.holdings, portfolio.percentage);

    // Collapsing duplicates and summing percentages
    const collapsedHoldings = expandedHoldings.reduce((acc, curr) => {
        const existingEntry = acc.find((entry) => entry.id === curr.id);

        if (existingEntry) {
            existingEntry.percentage += curr.percentage;
        } else {
            acc.push(curr);
        }

        return acc;
    }, []);

    // sort DESC
    return sortFundsDescending(collapsedHoldings);
};

const displayAggregatePortfolio = (aggregateList) =>
    (document.getElementById('aggregateDisplay').innerHTML = aggregateList
        .map((holding) => `<li>${holding.name}: ${holding.percentage.toFixed(1)}%</li>`)
        .join(''));

const calculateLeverage = (aggregateList, ignoredAssets = ['CASHX']) =>
    aggregateList.filter((holding) => !ignoredAssets.includes(holding.tickerSymbol)).reduce((sum, holding) => sum + holding.percentage, 0) /
    100;

const generateBacktestURL = (aggregateList) => {
    let url =
        'https://www.portfoliovisualizer.com/backtest-portfolio?s=y&timePeriod=2&startYear=1985&firstMonth=1&endYear=2023&lastMonth=12&calendarAligned=false&includeYTD=false&initialAmount=10000&annualOperation=0&annualAdjustment=0&inflationAdjusted=true&annualPercentage=0.0&frequency=4&rebalanceType=1&absoluteDeviation=5.0&relativeDeviation=25.0&leverageType=0&leverageRatio=0.0&debtAmount=0&debtInterest=0.0&maintenanceMargin=25.0&leveragedBenchmark=false&reinvestDividends=true&showYield=false&showFactors=false&factorModel=3&benchmark=VFINX&portfolioNames=true&portfolioName1=Custom&portfolioName2=Example&portfolioName3=Example';

    aggregateList.forEach((holding, index) => {
        url += `&symbol${index + 1}=${holding.tickerSymbol}&allocation${index + 1}_1=${holding.percentage}`;
    });

    return url;
};

const calculateAndUpdate = () => {
    let totalPercentage = 0;
    let portfolio = [];

    // Iterate over the 10 rows you created, not the funds array
    for (let i = 0; i < 5; i++) {
        const fundId = document.getElementById('fundSelect' + i).value;
        const fund = funds.find((f) => f.id == fundId);
        const percentage = parseFloat(document.getElementById('fundPercentage' + i).value);
        totalPercentage += percentage;

        if (percentage > 0) {
            portfolio.push({
                ...fund,
                percentage
            });
        }
    }

    if (totalPercentage !== 100) {
        alert('Total percentage must add up to 100');
        return;
    }

    const aggregate = generateAggregatePortfolio({ id: undefined, percentage: 100, holdings: portfolio });
    document.getElementById('portfolioName').textContent = 'Custom Portfolio';
    displayAggregatePortfolio(aggregate);

    document.getElementById('portfolioLeverage').textContent = calculateLeverage(aggregate).toFixed(2);

    // Code to calculate and update pie composition
    const excludeTicker = 'CASHX';
    const totalForComposition = aggregate.reduce((acc, holding) => {
        if (holding.tickerSymbol !== excludeTicker) {
            acc += holding.percentage;
        }
        return acc;
    }, 0);

    const compositionDisplay = document.getElementById('compositionDisplay');
    compositionDisplay.innerHTML = '';
    aggregate.forEach((holding) => {
        if (holding.tickerSymbol !== excludeTicker) {
            const relativePercentage = (holding.percentage / totalForComposition) * 100;
            const li = document.createElement('li');
            li.textContent = `${holding.name}: ${relativePercentage.toFixed(1)}%`;
            compositionDisplay.appendChild(li);
        }
    });

    // Generate the backtest URL
    const backtestURL = generateBacktestURL(aggregate);

    // Add the external link symbol with the generated URL
    const iconLink = document.createElement('a');
    iconLink.href = backtestURL;
    iconLink.target = '_blank'; // Open in a new tab
    iconLink.innerHTML = '&#x2197;';
    iconLink.style.fontSize = '18px'; // Adjust the size as needed
    iconLink.style.textDecoration = 'none'; // Remove underline
    iconLink.style.color = '#000'; // Set color if needed

    document.getElementById('portfolioVisualizerLink').textContent = '';
    document.getElementById('portfolioVisualizerLink').appendChild(iconLink);

    document.getElementById('results').style.display = 'block';
};
