import React, { useState } from 'react';

import ShareholderButton from './ShareholderButton.js';
import PayerList from './PayerList.js';
import TextFieldInput from './TextField.js'
import ValueFieldInput from './NumberField.js'
import {data, updateData} from '../data/SpendData.js';

import {toCurrencyFormat} from '../utils/StringUtils.js';
import {update_list} from '../utils/ArrayUtils.js';

// data got from server Node.js
const shareholderName = data.shareholderData.names;
let spends = data.spends;
let payers = data.payers;
let per_shares = data.per_shares;

// Function to check if a name is in shareholder array of a spend
const isShare = (checkName, spendIndex) => {
  return spends[spendIndex].shareholder.includes(checkName)
}

// Function to check if we need to update database
const isNeedUpdate = async () => {
  let updateList = spends.filter(spend => spend.isChanged());
  if (updateList.length){
    console.log("Need update", updateList)
    await updateData(updateList)
  } else {
    console.log("No need to update")
  }
}

// Function to call when users exit our site:
// 1-Close the tab
// 2-Close browser
window.addEventListener('beforeunload', async (event) => {
  // Perform cleanup or show a confirmation message
  event.preventDefault();
  event.returnValue = '';
  await isNeedUpdate();
});


// Code for main component SpendTable
const SpendTable = () => {

  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  const [selectedPayer, setSelectedPayer] = useState(payers);
  const [perShares, setPerShares] = useState(per_shares);

    // Event handler for when an option is selected
  const handlePayerChange = (index, value) => {
    // Update components state
    // setSelectedPayer is not explicitly defined in our component code,
    // it's provided by React when you call useState, and you can use it to set the value of count as needed
    setSelectedPayer(update_list(selectedPayer, value, index));
    spends[index].updatePayer(value);
  };

  // Function call when users interact with shareholder buttons. Called in ShareholderButton
  const handleShareholderClick = (name, index) => {
    // Update to Spend object: Remove or add stakeholder to a spend
    if (!spends[index].updateShareholder(name)) {
      return false
    };

    // Update perShares list
    setPerShares(update_list(perShares, spends[index].per_share, index))
    return true
  };

  // Function to update name of spend to Spend object: For saving to database
  const handleNameChange = (index, value) => {
    spends[index].updateName(value);
  }

  // Function to update relative variables when value of spend change.
  const handleValueChange = (index, value) => {
    spends[index].updateValue(value);
    // Update perShares list
    setPerShares(update_list(perShares, spends[index].per_share, index))
  }


  // Block of code for render React components: Should not include logic
  return (
    <>
      {/* Table of spend */}
      <table>
        {/* Label rows */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            <th>Payer</th>
            <th>Shareholder</th>
            <th>Per Share</th>
          </tr>
        </thead>
        {/* Data rows */}
        <tbody>
          {/* Loop throught the spends, create a row for each data*/}
          {spends.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              {/* Information of spend */}
              <td>{TextFieldInput(item.name, index, handleNameChange)}</td>

              {/* Value of spend: Money */}
              <td>{ValueFieldInput(item.value, index, handleValueChange)}</td>

              {/* Payer dropdown list */}
              <td>{PayerList(index, selectedPayer[index], shareholderName, handlePayerChange)}</td>

              {/* Toggle buttons for choosing shareholders-whose will share the spend */}
              <td>
                {shareholderName.map((name, shareIndex) => (
                  <ShareholderButton
                    key={'btn_' +shareIndex}
                    isShare={isShare(name, index)}
                    onClick={() => handleShareholderClick(name, index)}>
                    {name}
                  </ShareholderButton>
                ))}
              </td>

              {/* Value per person-Formated in currency format */}
              <td>{toCurrencyFormat(perShares[index].toFixed(0))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Table of member */}
    </>
  );
};

export default SpendTable;

// NOTE for the next development: To night-5/10/2023
// Create class to show static data for spends, similar to table in form on google sheet
// https://docs.google.com/spreadsheets/d/1eHKVnwERarsWtzaN75m97AIoz5pOz9oo/edit#gid=246766272
