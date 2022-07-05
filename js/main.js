const amount_input = document.querySelector('.amount-input');
const from_currency = document.querySelector('.from-dropdown');
const to_currency = document.querySelector('.to-dropdown');
const input_value = document.querySelector('.input-value');
const output_value = document.querySelector('.output-value');
const input_currency = document.querySelector('.input-currency');
const output_currency = document.querySelector('.output-currency');
const convert_btn = document.querySelector('.convert-btn');
const alert_message = document.querySelector('.alert-message');


//api url
const API_KEY = '3237605e72ae640493e2c0bd';
const api_url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

window.addEventListener('load', setDefaultValues);

//values
var from_value = '';
var to_value = '';
var amount = '';

convert_btn.addEventListener('click', () => {
    from_value = from_currency.value;
    to_value = to_currency.value;
    amount = amount_input.value;
    if (amount == '' || from_value == '' || to_value == '') {
        showAlertMessage('Please fill all the fields', 'error', 3000);
    }else if (amount == 0) {
        showAlertMessage('Please enter a valid amount', 'error', 3000);
    }else if(from_value == to_value){
        showAlertMessage('Please select different currencies', 'error', 3000);
    }else {
        calculateConversion(from_value, to_value, amount);
        showAlertMessage('Conversion Successful', 'success', 3000);
    }
});

//claculate the conversion
function calculateConversion(from, to, amount) {
    const url = `${api_url}${from}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[to];
            const result = amount * rate;
            output_value.innerHTML = result;
            output_currency.innerHTML = to;
            input_value.innerHTML = amount;
            input_currency.innerHTML = from;
        });
}

//get the currency rates
for ([key, value] of Object.entries(CURRENCY_LIST)) {
    from_currency.innerHTML += `<option value="${key}">${key}</option>`;
    to_currency.innerHTML += `<option value="${key}">${key}</option>`;
}

//set default values
function setDefaultValues() {
    from_currency.value = 'USD';
    to_currency.value = 'MAD';
    amount_input.value = '1';
    input_value.innerHTML = '1';
    input_currency.innerHTML = 'USD';
    output_value.innerHTML = calculateConversion(from_currency.value, to_currency.value, amount_input.value);
    output_currency.innerHTML = 'EUR';
}


//show alert message
function showAlertMessage(message, type, time) {
    alert_message.innerHTML = `
    <div class="alert alert-${type} shadow-lg">
        <div>
            <i class="bx ${type == 'success' ? 'bx-check-circle' : 'bx-x-circle'} bx-sm"></i>
            <span>${message}</span>
        </div>
    </div>`;

    setTimeout(() => {
        alert_message.innerHTML = '';
    }, time);
}