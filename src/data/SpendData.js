import axios from 'axios';

import Spend from './Spend';
import Member from './Member';

const url = 'http://localhost:3001/data'
const updateUrl = 'http://localhost:3001/update'
const addUrl = 'http://localhost:3001/add'

// Function to get data from backend server to show in UI
async function getData() {
  try {
    // Send a GET request to the backend
    const response = await axios.get(url);
    return response.data
  } catch (error) {
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

// Function to send updated data back to backend to save in database
export async function updateData(updatedData) {
  try {
    // Send a GET request to the backend
    const response = await axios.post(updateUrl, updatedData);
    return response.data
  } catch (error) {
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

export var data = await getData();

var spendData = data.spendData
var names = data.shareholderData.names
// Code block to create an array of Spend objects (spends) from spendData and
// an array of payers (payers)
let spends = [];
let payers = [];
let per_shares = [];
let members = [];

// Init Member objects base on data from database
function initMember (name) {
  // Collect payer data
  let member = new Member(name);
  members.push(member);
}
names.forEach(initMember);

// Init Spend objects base on data from database
function initSpend (input_data) {
  // Collect payer data
  payers.push(input_data.payer);

  // Collect spend data
  let spend = new Spend(input_data);
  spends.push(spend);
  per_shares.push(spend.perShare);

  members.forEach((member) => {

    // If member is in the shareholder list => update per_share value of this spend as spending of this member
    if(spend.isHaveToPay(member.name)){
      member.updateSpending(spend.perShare);
    };

    // If member is payer => update the value of spend as amount spent of this member
    if(spend.payer === member.name){
      member.updateAmountSpent(spend.value);
    };
  });
}
spendData.forEach(initSpend);

// Add generated data to data
data.spends = spends;
data.payers = payers;
data.members = members;
data.per_shares = per_shares;
