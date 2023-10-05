

// Function to turn a number into currency format: For better presentation format
export const toCurrencyFormat = (value) => {
let currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    maximumSignificantDigits: 4,
});
return currencyFormat.format(value)
}