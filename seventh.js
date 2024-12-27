document.addEventListener('DOMContentLoaded', () => {
    const fromSelect = document.querySelector('select[name="from"]');
    const toSelect = document.querySelector('select[name="to"]');
    const fromFlag = document.querySelector('.from img');
    const toFlag = document.querySelector('.to img');
    const exchangeRateMessage = document.querySelector('.msg');
    const amountInput = document.getElementById('myInput');
    const button = document.querySelector('button');

    // Currency-to-flag mapping
    const currencies = {
        USD: 'https://flagsapi.com/US/flat/64.png',
        INR: 'https://flagsapi.com/IN/flat/64.png',
        EUR: 'https://flagsapi.com/EU/flat/64.png',
        GBP: 'https://flagsapi.com/GB/flat/64.png',
        AUD: 'https://flagsapi.com/AU/flat/64.png'
    };

    // Populate dropdowns
    Object.keys(currencies).forEach(currency => {
        fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
        toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    // Set default values and flags
    fromSelect.value = 'USD';
    toSelect.value = 'INR';
    fromFlag.src = currencies['USD'];
    toFlag.src = currencies['INR'];

    // Update flags automatically when currency is selected
    fromSelect.addEventListener('change', () => {
        fromFlag.src = currencies[fromSelect.value];
    });

    toSelect.addEventListener('change', () => {
        toFlag.src = currencies[toSelect.value];
    });

    // Dummy exchange rates (static)
    const rates = {
        USD: { INR: 83, EUR: 0.93, GBP: 0.74, AUD: 1.5 },
        INR: { USD: 0.012, EUR: 0.011, GBP: 0.009, AUD: 0.018 }
    };

    // Calculate exchange rate
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        const fromCurrency = fromSelect.value;
        const toCurrency = toSelect.value;
        const amount = parseFloat(amountInput.value);

        if (isNaN(amount) || amount <= 0) {
            exchangeRateMessage.textContent = 'Please enter a valid amount.';
            return;
        }

        const rate = rates[fromCurrency]?.[toCurrency];
        if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
            exchangeRateMessage.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            exchangeRateMessage.textContent = 'Exchange rate not available.';
        }
    });
});
