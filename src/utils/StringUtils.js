

// Function to turn a number into currency format: For better presentation format
export const toCurrencyFormat = (value) => {
let currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    maximumSignificantDigits: 4,
});
return currencyFormat.format(value)
}

/**
 *  @param {string} value Target value Ex: 1000.
 *  @returns {string} Formatted string of value Ex: 1,000.
 */
export const numberWithCommas = (value) => {

    return value.toLocaleString(undefined, {maximumFractionDigits: 0});
}
// export const numberWithCommas = (value) => {
//     return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// }