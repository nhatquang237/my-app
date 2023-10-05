import React, { useState } from 'react';

import ShareholderButton from './ShareholderButton.js';
import PayerList from './PayerList.js';
import TextFieldInput from './TextField.js'
import ValueFieldInput from './NumberField.js'
import {data, updateData} from '../data/SpendData.js';

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
    // Function to create a POST method to update data from updateList to database will be implemented SOON.
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
  // Add some more function to call for:
  // 1-Clean up process
  // 2-Update the last state of data to database

  // Tasks to do:
  // 1-Implement mentioned function in line 24
});


// Code for main component SpendTable
const SpendTable = () => {

  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  const [selectedPayer, setSelectedPayer] = useState(payers);
  const [perShares, setPerShares] = useState(per_shares);

    // Event handler for when an option is selected
  const handlePayerChange = (index, value) => {
    // Get value and id of changed component
    // const { name, value } = event.target;

    // parseInt to get index from component's name
    // var index = parseInt(name);

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

  // Function to turn a number into currency format: For better presentation format
  const toCurrencyFormat = (value) => {
    let currencyFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
      maximumSignificantDigits: 4,
    });
    return currencyFormat.format(value)
  }

  // Function use for updating state of components that have state value equal to a list.
  const update_list = (targetList, newValue, index) => {
    // Create a new list that is a copy of the old list using the spread operator
    // another way to do is use: Array.from()
    const updatedList = [...targetList];
    updatedList[index] = newValue;

    return updatedList
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
    </>
  );
};

export default SpendTable;
