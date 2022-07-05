const amount_input = document.querySelector('.amount-input');
const from_currency = document.querySelector('.from-dropdown');
const to_currency = document.querySelector('.to-dropdown');
const input_value = document.querySelector('.input-value');
const output_value = document.querySelector('.output-value');
const input_currency = document.querySelector('.input-currency');
const output_currency = document.querySelector('.output-currency');
const convert_btn = document.querySelector('.convert-btn');


//api url
// const api_url = 'https://open.er-api.com/v6/latest/';
const API_KEY = '3237605e72ae640493e2c0bd';
const api_url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

//values
var from_value = '';
var to_value = '';
var amount = '';

convert_btn.addEventListener('click', () => {
    from_value = from_currency.value;
    to_value = to_currency.value;
    amount = amount_input.value;
    if (amount == '' || from_value == '' || to_value == '') {
        alert('Please enter an amount');
    } else {
        displayConversion(from_value, to_value, amount);
    }
});


//fucntion to get the currency rates
function getCurrencyRates(from, to) {
    return fetch(`${api_url}${from}`)
        .then(response => response.json())
        .then(data => {
            return data.conversion_rates[to];
        });
}

console.log(getCurrencyRates('USD', 'INR'));

//calculate the conversion
function calculateConversion(from, to, amount) {
    return getCurrencyRates(from, to)
        .then(rate => {
            return amount * rate;
        });
}

console.log(calculateConversion('USD', 'MAD', 100));


//result of the conversion
function displayConversion(from, to, amount) {
    input_currency.innerHTML = amount;
    output_currency.innerHTML = calculateConversion(from, to, amount);
    from_currency.value = from_value;
    to_currency.value = to_value;
}


//get the currency rates
for ([key, value] of Object.entries(CURRENCY_LIST)) {
    from_currency.innerHTML += `<option value="${value}">${key}</option>`;
    to_currency.innerHTML += `<option value="${value}">${key}</option>`;
}