import React, { useState } from 'react';

import MyButton from './CustomButton.js';
import DropDownList from './DropDownList.js';
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


// Render function
const SpendTable = () => {

  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  const [selectedPayer, setSelectedPayer] = useState(payers);
  const [perShares, setPerShares] = useState(per_shares);

    // Event handler for when an option is selected
  const handlePayerChange = (event) => {
    // Get value and id of changed component
    const { name, value } = event.target;

    // parseInt to get index from component's name
    var index = parseInt(name);

    // Update components state
    // setSelectedPayer is not explicitly defined in our component code,
    // it's provided by React when you call useState, and you can use it to set the value of count as needed
    setSelectedPayer(update_list(selectedPayer, value, index));
  };

  const handleShareholderClick = (name, index) => {
    // Update to Spend object: Remove or add stakeholder to a spend
    if (!spends[index].updateShareholder(name)) {
      return false
    };
    // Add function to save data back to database on exit event

    // Update perShares list
    setPerShares(update_list(perShares, spends[index].per_share, index))
    return true
  };

  const update_list = (targetList, newValue, index) => {
    // Function use for updating state of components that have state value equal to a list.

    // Create a new list that is a copy of the old list using the spread operator
    // another way to do is use: Array.from()
    const updatedList = [...targetList];
    updatedList[index] = newValue;

    return updatedList
  }


  // Block of code for render React components
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
              <td>{TextFieldInput(item.name)}</td>
              {/* Add state and event handler to update value to spend object */}
              {/* <td>{item.name}</td> */}

              {/* Value of spend */}
              {/* Add state and event handler to update value to spend object */}
              <td>{ValueFieldInput(item.value)}</td>

              {/* Payer dropdown list */}
              <td>{DropDownList(index, selectedPayer[index], shareholderName, handlePayerChange)}</td>

              {/* Toggle buttons for choosing all shareholders */}
              <td>
                {shareholderName.map((name, shareIndex) => (
                  <MyButton
                    key={'btn_' +shareIndex}
                    isShare={isShare(name, index)}
                    onClick={() => handleShareholderClick(name, index)}
                  >
                    {name}
                  </MyButton>
                ))}
              </td>

              {/* Value per person - only get 2 digits after the decimal */}
              <td>{perShares[index].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SpendTable;
