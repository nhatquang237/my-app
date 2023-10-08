import React, { useState } from 'react';

import ShareholderButton from './ShareholderButton.js';
import PayerList from './PayerList.js';
import TextFieldInput from './TextField.js'
import ValueFieldInput from './NumberField.js'
import {data, updateData} from '../data/SpendData.js';

import {numberWithCommas} from '../utils/StringUtils.js';
import {update_list} from '../utils/ArrayUtils.js';

// data got from server Node.js
const shareholderName = data.shareholderData.names;
let spends = data.spends;
let payers = data.payers;
let rawMembers = data.members;
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
  const [members, setMembers] = useState(rawMembers);

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
  const handleNameChange = (index, newValue, oldValue) => {
    let spend = spends[index];
    // For Spend object: Update name of spend
    spend.updateName(newValue);

    // For Member object: Update SpendingList, PaidList
    members.forEach(member => {
      if(spend.payer === member.name){
        member.addToPaidList(newValue)
        member.removeFromPaidList(oldValue)
      }
      if(spend.shareholder.includes(member.name)){
        member.addToSpendingList(newValue)
        member.removeFromSpendingList(oldValue)
      }
    });
    setMembers(update_list(members))
  }

  // Function to update relative variables when value of spend change.
  const handleValueChange = (index, value, delta) => {
    let spend = spends[index];

    spend.updateValue(value);
    // For Spend object: Update perShares list
    setPerShares(update_list(perShares, spend.per_share, index))

    // For Member objects that related to that spend
    members.forEach(member => {
      if(spend.payer === member.name){
        member.updateAmountSpent(delta)
      }
      if(spend.shareholder.includes(member.name)){
        member.updateSpending(delta / spend.shareholder.length)
      }
    });
    setMembers(update_list(members))

  }


  // Block of code for render React components: Should not include any logic
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
            <tr key={'spendTb_' + index}>
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
              <td className="numeric">{numberWithCommas(perShares[index])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      {/* Table of member */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Paid</th>
            <th>Spending</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop throught the spends, create a row for each data*/}
          {members.map((member, index) => (
            <tr key={'memberTb_' + index}>
              <td>{index + 1}</td>
              <td>{member.name }</td>
              {/* Implement state for these numbers below */}
              <td className="numeric">{member.getAmountSpent()}</td>
              <td className="numeric">{member.getSpending()}</td>
              <td className="numeric">{member.getRemaining()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SpendTable;

// NOTE for the next development: To night-5/10/2023

