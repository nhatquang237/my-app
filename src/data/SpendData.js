import axios from '../api/axios'

import Spend from './Spend';
import Member from './Member';

const url = '/data'
const updateUrl = '/update'
const addUrl = '/add'
const deleteUrl = '/delete'

// Function to get data from backend server to show in UI
export async function getData() {
  try {
    const response = await axios.get(url);
    const data = prepareData(response.data)
    return data
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


function prepareData (rawData) {
  var spendData = rawData.spendData
  const names = rawData.shareholderData.names
  let payers = [];
  let per_shares = [];
  const initMember = (name) => new Member(name);
  let members = names.map(initMember);

  const initSpend = (input_data) => {
    // Collect payer data
    payers.push(input_data.payer);

    let spend = new Spend(input_data);

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
    return spend;
  }
  let spends = spendData.map(initSpend);
  let cookData = {"members": members, "payers": payers, "spends": spends};

  return Object.assign(rawData, cookData);
}


// Note: Move all loading stuff into the state of loading the Spend table
// to make it protected with login feature