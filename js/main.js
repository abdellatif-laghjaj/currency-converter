const amount_input = document.querySelector('.amount-input');
const from_currency = document.querySelector('.from-dropdown');
const to_currency = document.querySelector('.to-dropdown');
const input_value = document.querySelector('.input-value');
const output_value = document.querySelector('.output-value');
const input_currency = document.querySelector('.input-currency');
const output_currency = document.querySelector('.output-currency');
const convert_btn = document.querySelector('.convert-btn');


//api url
const api_url = 'https://open.er-api.com/v6/latest/';

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
        alert('Converting...');
    }
});


for ([key, value] of Object.entries(CURRENCY_LIST)) {
    from_currency.innerHTML += `<option value="${value}">${key}</option>`;
    to_currency.innerHTML += `<option value="${value}">${key}</option>`;
}