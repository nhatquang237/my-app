import axios from '../api/axios'

import Spend from './Spend';
import Member from './Member';

const url = '/data'
const updateUrl = '/update'
const addUrl = '/add'
const deleteUrl = '/delete'

// Function to get data from backend server to show in UI
async function getData() {
  try {
    const response = await axios.get(url);
    return response.data
  } catch (error) {
    throw error;
  }
}

// Function to send deleted data back to backend to delete accordingly documents in database
export async function deleteData(deletedData) {
  try {
    const ids = deletedData.map(data => data.id)
    const response = await axios.delete(deleteUrl, {data: {ids: ids}});
    return response.data
  } catch (error) {
    throw error;
  }
}

// Function to send updated data back to backend to save in database
export async function updateData(updatedData) {
  try {
    // Send a GET request to the backend
    const response = await axios.put(updateUrl, updatedData);
    return response.data
  } catch (error) {
    throw error;
  }
}

// Function to send updated data back to backend to save in database
export async function addData(newData) {
  try {
    // Send a GET request to the backend
    const response = await axios.post(addUrl, newData);
    return response.data
  } catch (error) {
    throw error;
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

// Add generated data to data object
data.spends = spends;
data.payers = payers;
data.members = members;

// Note: Move all loading stuff into the state of loading the Spend table
// to make it protected with login feature