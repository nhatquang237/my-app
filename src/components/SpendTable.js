import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
// import { useNavigate } from "react-router-dom";

import ShareholderButton from './ShareholderButton.js';
import DeleteButton from './DeleteButton.js';
import PayerList from './PayerList.js';
import TextFieldInput from './TextField.js';
import ValueFieldInput from './NumberField.js';
import Form from './Form.js';
import Spend from '../data/Spend';
import SpendHeader from './SpendHeader.js';
import MemberHeader from './MemberHeader.js';
import socketConnect from '../socket.js'

import { getData, updateDatabase } from '../data/SpendData.js';
import { numberWithCommas } from '../utils/StringUtils.js';
import { update_list, deleteItemAtIndex } from '../utils/ArrayUtils.js';

const storeObject = {
  allSpend: [],
  deletedSpends: [],
  newSpends: [],
  shareholderName: [],
  members: [],
  socket: null
};


// Function to call when users exit our site:
// 1-Close the tab
// 2-Close browser
window.addEventListener('beforeunload', async (event) => {
  // Update change from UI to database
  event.preventDefault();
  await updateDatabase(storeObject.allSpend, storeObject.deletedSpends, storeObject.newSpends);
  if (storeObject.socket) {
    await storeObject.socket.close()
  }
});

// Function to check if a name is in shareholder array of a spend
const isShare = (allSpend, checkName, spendIndex) => {
  return allSpend[spendIndex].shareholder.includes(checkName);
}

// Code for main component SpendTable
const SpendTable = () => {

  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  // const navigate = useNavigate();
  const spendPerPage = 12;

  const [allSpend, setAllSpend] = useState([]);
  const [members, setMembers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showingSpend, setShowingSpend] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {

    // Call the async function
    fetchData();

    // Connect to socket
    const new_socket = socketConnect();
    new_socket.addEventListener("message", handleSocketMessage);
    storeObject.socket = new_socket;
    setSocket(new_socket);

    return () => {
      if (socket) {
        socket.removeEventListener("message", handleSocketMessage);
        socket.close()
      }
    }
    // eslint-disable-next-line
  }, []);

  // Function to get spend data from MongoDb database
  const fetchData = async () => {

    // Perform async operation to fetch data from a backend API
    const data = await getData()
    if (data.error) {
      // navigate("/login");
      return
    }

    // Update state with the fetched data
    storeObject.members = data.members
    setMembers(data.members)

    storeObject.allSpend = data.spends
    setAllSpend(data.spends)

    storeObject.shareholderName = data.shareholderData.names
    setShowingSpend(data.spends.slice(0, Math.min(spendPerPage, data.spends.length)))

  };

  // Event handler for incoming message from socket
  const handleSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.name){
      const { name, index } = data
      handleShareholderClick(name, index, false)
    } else {
      const { index, newValue, oldValue } = data
      handlePayerChange(index, newValue, oldValue, false)
    }
  }

  // Event handler for when an option is selected
  const handlePayerChange = (index, newValue, oldValue, runSocket = true) => {
    if (runSocket) {
      const changedData = JSON.stringify({ "index": index, "newValue": newValue, "oldValue": oldValue })
      socket.send(changedData)
    }

    // Update components state
    // setSelectedPayer is not explicitly defined in our component code,
    // it's provided by React when you call useState, and you can use it to set the value of count as needed

    let spend = storeObject.allSpend[index];

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
    storeObject.members = members
  };

  // Function call when users interact with shareholder buttons. Called in ShareholderButton
  const handleShareholderClick = (name, index, runSocket = true) => {
    if (runSocket) {
      const changedData = JSON.stringify({ "name": name, "index": index})
      socket.send(changedData)
    }
    console.log(storeObject.allSpend.length, ' length for checking')

    let spend = storeObject.allSpend[index];
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
    storeObject.members = members
    storeObject.allSpend = allSpend
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
    storeObject.members = members
    storeObject.allSpend = allSpend
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
    storeObject.members = members
    storeObject.allSpend = allSpend

  };

  // Function to add new spend from Form data
  const handleAddNewSpend = (newSpend) => {

    // Create new Spend object form form's data
    let spend = new Spend(newSpend)

    // Add new object to current list of spend for rendering
    allSpend.unshift(spend)

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

    setMembers(update_list(members));
    storeObject.members = members
    
    setShowingSpend(allSpend.slice(0, showingSpend.length))
    storeObject.allSpend = allSpend

    // Add to new created list for updating to database later
    storeObject.newSpends.push(spend)
  };

  // Function to delete a spend from Form data
  const handleDeleteSpend = (deleteIndex) => {

    // Get Spend object form delete_index
    let spend = allSpend[deleteIndex]

    // Add spend object to deleted list to update in database
    storeObject.deletedSpends.push(spend)

    // Update the state of allSpend for rendering the Spend table
    const updatedAllSpend = deleteItemAtIndex(allSpend, deleteIndex)
    setAllSpend(updatedAllSpend)
    setShowingSpend(updatedAllSpend.slice(0, showingSpend.length))

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
    storeObject.members = members
    storeObject.allSpend = allSpend
  }

  const getMoreSpend = () => {
    if (!(showingSpend.length < allSpend.length)) {
      setHasMore(false)
      return
    }
    setShowingSpend(allSpend.slice(0, showingSpend.length + spendPerPage))
  }


  function member_row(index, member) {
    return <tr key={'memberTb_' + index}>
      <td>{index + 1}</td>
      <td>{member.name}</td>
      {/* Implement state for these numbers below */}
      <td className="numeric">{member.getAmountSpent()}</td>
      <td className="numeric">{member.getSpending()}</td>
      <td className="numeric">{member.getRemaining()}</td>
    </tr>;
  }

  function spend_row(index, spend) {
    return <tr key={'spendTb_' + index}>
      <td>{index + 1}</td>

      {/* Information of spend */}
      <td key={'textField_' + index}>{TextFieldInput(spend.name, index, handleNameChange)}</td>

      {/* Value of spend: Money */}
      <td>{ValueFieldInput(spend.value, index, handleValueChange)}</td>

      {/* Payer dropdown list */}
      <td>{PayerList(index, spend.payer, storeObject.shareholderName, handlePayerChange)}</td>

      {/* Toggle buttons for choosing shareholders-whose will share the spend */}
      <td>
        {storeObject.shareholderName.map((name, shareIndex) => (
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
    </tr>;
  }

  // Block of code for render React components: Should not include any logic
  return (
    <>
      {/* Table of spend */}
      <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center'}}>
        <InfiniteScroll
          dataLength={showingSpend.length}
          next={getMoreSpend}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>You get all of data!</p>}
        >
          <table style={{ height: '100%' }}>
            {/* Table header */}
            <SpendHeader/>

            {/* Spend rows */}
            <tbody>
              {/* Loop throught the allSpend, create a row for each data*/}
              {showingSpend.map((spend, index) => (
                spend_row(index, spend)
              ))}
            </tbody>

          </table >
        </InfiniteScroll>

        <div style={{ marginLeft: '50px'}}>

          {/* Table of member */}
          <table >
            <MemberHeader/>
            <tbody>
              {/* Loop throught the member, create a row for each member*/}
              {members.map((member, index) => (
                member_row(index, member)
              ))}
            </tbody>
          </table>

          {/* Form for adding spend */}
          <div className='divWithBorder'>
            <Form
              shareholderNames={[...storeObject.shareholderName]}
              lastShareholder={[...storeObject.shareholderName]}
              onSubmit={handleAddNewSpend}>
            </Form>
          </div>

        </div>
      </div>
    </>
  );

};

export default SpendTable;
