const funds = [...marketFunds, ...customPortfolios].sort((a, b) => a.name.localeCompare(b.name));

// Generate fund selection table with 10 rows
for (let i = 0; i < 5; i++) {
    const tr = document.createElement('tr');

    // Create dropdown for fund selection
    const tdFund = document.createElement('td');
    const select = document.createElement('select');
    select.id = 'fundSelect' + i;
    select.className = 'form-control'; // Apply Bootstrap class to select
    funds.forEach((fund) => {
        const option = document.createElement('option');
        option.value = fund.id;
        option.textContent = fund.name;
        select.appendChild(option);
    });
    tdFund.appendChild(select);
    tr.appendChild(tdFund);

    // Create input for percentage
    const tdPercentage = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'fundPercentage' + i;
    input.className = 'form-control'; // Apply Bootstrap class to input
    input.min = '0';
    input.max = '100';
    input.value = '0';
    tdPercentage.appendChild(input); // Removed appendChild of text node
    tr.appendChild(tdPercentage);

    document.getElementById('fundSelection').querySelector('tbody').appendChild(tr);
}
