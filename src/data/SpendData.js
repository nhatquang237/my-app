import axios from 'axios';
import Spend from '../components/Spend';
const url = 'http://localhost:3001/data'

async function getData() {
  try {
    // Send a GET request to the backend
    const response = await axios.get(url);
    return response.data
  } catch (error) {
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

var data = await getData();

var spendData = data.spendData

// Code block to create an array of Spend objects (spends) from spendData and
// an array of payers (payers)
let spends = [];
let payers = [];
let per_shares = [];
function initSpend (input_data) {
  // Collect payer data
  payers.push(input_data.payer);

  // Collect spend data
  let spend = new Spend(input_data);
  spends.push(spend);
  per_shares.push(spend.per_share);
}
spendData.forEach(initSpend);

// Add generated data to data
data.spends = spends;
data.payers = payers;
data.per_shares = per_shares;

export default data