import React, { useState, useEffect } from 'react';

import ShareholderButton from './ShareholderButton.js';
import DeleteButton from './DeleteButton.js';
import PayerList from './PayerList.js';
import TextFieldInput from './TextField.js';
import ValueFieldInput from './NumberField.js';
import Form from './Form.js';
import Spend from '../data/Spend';

import { getData, updateDatabase } from '../data/SpendData.js';
import { numberWithCommas } from '../utils/StringUtils.js';
import { update_list, deleteItemAtIndex } from '../utils/ArrayUtils.js';

// Function to check if a name is in shareholder array of a spend
const isShare = (allSpend, checkName, spendIndex) => {
  return allSpend[spendIndex].shareholder.includes(checkName);
}

// Code for main component SpendTable
const SpendTable = () => {

  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  const [members, setMembers] = useState([]);
  const [allSpend, setAllSpend] = useState([]);
  const [newSpends, setNewSpends] = useState([]);
  const [deletedSpends, setDeletedSpends] = useState([]);
  const [shareholderName, setShareHolderName] = useState([]);

  // Function to call when users exit our site:
  // 1-Close the tab
  // 2-Close browser
  window.addEventListener('beforeunload', async (event) => {
    // Update change from UI to database
    await updateDatabase(allSpend, deletedSpends, newSpends);
  });

  useEffect(() => {
    // useEffect itself cannot be an async function directly, so we need to define async function inside and call it
    const fetchData = async () => {
      try {

        // Perform async operation to fetch data from a backend API
        const data = await getData()

        // Update state with the fetched data
        setMembers(data.members)
        setAllSpend(data.spends)
        setShareHolderName(data.shareholderData.names)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
    // eslint-disable-next-line
    }, []);

  // Event handler for when an option is selected
  const handlePayerChange = (index, newValue, oldValue) => {
    // Update components state
    // setSelectedPayer is not explicitly defined in our component code,
    // it's provided by React when you call useState, and you can use it to set the value of count as needed
    let spend = allSpend[index];
    // For spend object:
    spend.updatePayer(newValue);

    // For Member object: Update SpendingList, PaidList
    members.forEach(member => {
      if (member.name === oldValue) {
        member.updateAmountSpent(- spend.value)
        member.removeFromPaidList(oldValue)
      }
      if (member.name === newValue) {
        member.updateAmountSpent(spend.value)
        member.addToPaidList(newValue)
      }
    });
    setMembers(update_list(members))
  };

  // Function call when users interact with shareholder buttons. Called in ShareholderButton
  const handleShareholderClick = (name, index) => {
    let spend = allSpend[index];
    const oldPerShare = spend.perShare;
    // Update to Spend object: Remove or add stakeholder to a spend
    if (!spend.updateShareholder(name)) {
      return false
    };
    // Updated value of divisor
    const newPerShare = spend.perShare;
    const changeAmount = newPerShare - oldPerShare;

    // For Member object: Update SpendingList, PaidList
    members.forEach(member => {
      // If member still in the shareholder list after click event
      //=> spending of this member have to be updated in two cases:
      // 1-New member to this spend: Increase the newPerShare
      // 2-Old member: Update with changeAmount (may be increase or decrease)
      if (spend.shareholder.includes(member.name)) {
        if (member.name === name) {
          member.addToSpendingList(spend.name)
          member.updateSpending(newPerShare)
        } else {
          member.updateSpending(changeAmount)
        }
        // If member not in the shareholder list after click event
        // => This member was remove from shareholder list:
        // 1-Remove this spend from spendingList of this member
        // 2-Update spending of this member: Decrease oldPerShare
      } else if (member.name === name) {
        member.removeFromSpendingList(spend.name)
        member.updateSpending(- oldPerShare)
      }
    });
    setMembers(update_list(members))
    return true
  };

  // Function to update name of spend to Spend object: For saving to database
  const handleNameChange = (index, newValue, oldValue) => {
    let spend = allSpend[index];
    // For Spend object: Update name of spend
    spend.updateName(newValue);

    // For Member object: Update SpendingList, PaidList
    members.forEach(member => {
      if (spend.payer === member.name) {
        member.addToPaidList(newValue)
        member.removeFromPaidList(oldValue)
      }
      if (spend.shareholder.includes(member.name)) {
        member.addToSpendingList(newValue)
        member.removeFromSpendingList(oldValue)
      }
    });
    setMembers(update_list(members))
  };

  // Function to update relative variables when value of spend change.
  const handleValueChange = (index, value, delta) => {
    let spend = allSpend[index];

    spend.updateValue(value);

    // For Member objects that related to that spend
    members.forEach(member => {
      if (spend.payer === member.name) {
        member.updateAmountSpent(delta)
      }
      if (spend.shareholder.includes(member.name)) {
        member.updateSpending(delta / spend.shareholder.length)
      }
    });
    setMembers(update_list(members))

  };

  // Function to add new spend from Form data
  const handleAddNewSpend = (newSpend) => {

    // Create new Spend object form form's data
    let spend = new Spend(newSpend)

    // Add new object to current list of spend for rendering
    allSpend.push(spend)

    // Add to new created list for updating to database later
    newSpends.push(spend)
    setNewSpends(newSpends)

    // Update the state of allSpend for rendering the Spend table
    setAllSpend(update_list(allSpend))

    // Update the member table
    // For Member object: Update SpendingList, PaidList
    members.forEach(member => {
      if (member.name === spend.payer) {
        member.addToPaidList(spend.name)
        member.updateAmountSpent(spend.value)
      }
      if (spend.shareholder.includes(member.name)) {
        member.addToSpendingList(spend.name)
        member.updateSpending(spend.perShare)
      }
    });

    setMembers(update_list(members))
  };

  // Function to delete a spend from Form data
  const handleDeleteSpend = (deleteIndex) => {

    // Get Spend object form delete_index
    let spend = allSpend[deleteIndex]

    // Add spend object to deleted list to update in database
    deletedSpends.push(spend)
    setDeletedSpends(deletedSpends)

    // Update the state of allSpend for rendering the Spend table
    setAllSpend(deleteItemAtIndex(allSpend, deleteIndex))

    // Update the member table
    // For Member object: Update SpendingList, PaidList
    members.forEach(member => {
      if (member.name === spend.payer) {
        member.removeFromPaidList(spend.name)
        member.updateAmountSpent(-spend.value)
      }
      if (spend.shareholder.includes(member.name)) {
        member.removeFromSpendingList(spend.name)
        member.updateSpending(-spend.perShare)
      }
    });

    setMembers(update_list(members))
  }


  // Block of code for render React components: Should not include any logic
  return (
    <>
      {/* Table of spend */}
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <table style={{ height: '100%' }}>
          {/* Label rows */}
          <thead style={{ position: 'sticky', top: '0px', zIndex: '2' }}>
            <tr>
              <th>STT</th>
              <th>Khoản chi</th>
              <th>Giá tiền</th>
              <th>Người chi tiền</th>
              <th>Người hưởng</th>
              <th>Chia TB</th>
              <th>Xóa</th>
            </tr>
          </thead>
          {/* Data rows */}
          <tbody>
            {/* Loop throught the allSpend, create a row for each data*/}
            {allSpend.map((spend, index) => (
              <tr key={'spendTb_' + index}>
                <td>{index + 1}</td>

                {/* Information of spend */}
                <td key={'textField_' + index}>{TextFieldInput(spend.name, index, handleNameChange)}</td>

                {/* Value of spend: Money */}
                <td>{ValueFieldInput(spend.value, index, handleValueChange)}</td>

                {/* Payer dropdown list */}
                <td>{PayerList(index, spend.payer, shareholderName, handlePayerChange)}</td>

                {/* Toggle buttons for choosing shareholders-whose will share the spend */}
                <td>
                  {shareholderName.map((name, shareIndex) => (
                    <ShareholderButton
                      key={'btn_' + shareIndex}
                      isShare={isShare(allSpend, name, index)}
                      onClick={() => handleShareholderClick(name, index)}>
                      {name}
                    </ShareholderButton>
                  ))}
                </td>

                {/* Value per person-Formated in currency format */}
                <td className="numeric">{numberWithCommas(spend.perShare)}</td>
                <td>
                  <DeleteButton
                    key={'DelBtn_' + index}
                    onClick={() => handleDeleteSpend(index)}>
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table >
        <div style={{ height: '100%', marginRight: '20px', position: 'sticky', top: '0px' }}>
          {/* Table of member */}
          <table >
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Đã chi</th>
                <th>Đã tiêu</th>
                <th>Còn dư lại</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop throught the member, create a row for each member*/}
              {members.map((member, index) => (
                <tr key={'memberTb_' + index}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  {/* Implement state for these numbers below */}
                  <td className="numeric">{member.getAmountSpent()}</td>
                  <td className="numeric">{member.getSpending()}</td>
                  <td className="numeric">{member.getRemaining()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Form for adding spend */}
          <div className='divWithBorder'>
            <Form
              shareholderNames={[...shareholderName]}
              lastShareholder={[...shareholderName]}
              onSubmit={handleAddNewSpend}>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpendTable;
