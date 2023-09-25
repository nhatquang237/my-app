import React, { useState } from 'react';
import { Button } from '@mui/material';
import Spend from './Spend.js';
import MyButton from './CustomButton.js';
// import Form from './Form';
import DropDownList from './DropDownList.js';

const SpendTable = () => {

  // Data for the dropdown options
  const shareholderName = ['Quang', 'Tai', 'Phuc', 'Thanh', 'Tien'];

  // Sample data for the table
  var spendData = [
    { name: 'Water', value: 10, payer: 'Quang', shareholder: ['Quang', 'Tai', 'Phuc', 'Thanh'] },
    { name: 'Electricity ', value: 100, payer: 'Tai', shareholder: ['Quang', 'Tai', 'Phuc', 'Thanh'] },
    { name: 'Stuff', value: 20, payer: 'Phuc', shareholder: ['Quang', 'Phuc', 'Thanh'] },
    { name: 'Book', value: 5, payer: 'Quang'},
  ]

  // Create an array of Spend objects
  let spends = [];
  let payers = [];
  function initSpend (input_data) {
    // Collect payer data
    payers.push(input_data.payer);

    // Collect spend data
    let spend = new Spend(input_data);
    spends.push(spend);
  }
  spendData.forEach(initSpend);

  const isShare = (checkName, spendIndex) => {
    return spends[spendIndex].shareholder.includes(checkName)
  }


  // State to track the current page
  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  const [number, setNumber] = useState(spendData.length);
  const [selectedOptions, setSelectedOptions] = useState(payers);

  // Slice the data array to display only the items for the current page
  let displayedData = spends.slice(0, number);

  // Handler for number of visible items
  const handleItemListChange = (value) => {
    // setNumber is not explicitly defined in our component code,
    // it's provided by React when you call useState, and you can use it to set the value of count as needed
    setNumber(value);
  };

  // Event handler for when an option is selected
  const handleOptionChange = (event) => {
    // Get value and id of changed component
    const { name, value } = event.target;

    // parseInt to get index from component's name
    var index = parseInt(name);

    //  Create a new list that is a copy of the old list using the spread operator
    //  another way to do is use: Array.from()
    const updatedList = [...selectedOptions];
    updatedList[index] = value;

    // Update components state
    setSelectedOptions(updatedList);
  };



  const handleShareholderClick = (shareIndex, name, index) => {
    // Your custom onClick logic goes here
    console.log('Button clicked!');
    console.log(shareIndex, name, index);


  };

  return (
    <>
      {/* Increasement buttons */}
      <div>
        <Button
          onClick={() => handleItemListChange(number - 1)}
          disabled={number === 1}
        >
        {/* Minus button */}
          -
        </Button>
        <Button
          onClick={() => handleItemListChange(number + 1)}
          disabled={number >= spends.length}
        >
          {/* Plus button */}
          +
        </Button>
      </div>
      {/* Table of spend */}
      <table>
        <thead>
          {/* Label rows */}
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            <th>Payer</th>
            <th>Shareholder</th>
            <th>Per Share</th>
          </tr>
        </thead>

        <tbody>
          {/* Loop throught the displayedData, create a row for each data*/}
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              {/* Information of spend */}
              <td>{item.name}</td>

              {/* Value of spend */}
              <td>{item.value}</td>

              {/* Payer dropdown list */}
              <td>{DropDownList(index, selectedOptions[index], shareholderName, handleOptionChange)}</td>

              <td className='shareholderCell'>
                {shareholderName.map((name, shareIndex) => (
                  <MyButton
                    key={'btn_' +shareIndex}
                    isShare={isShare(name, index)}
                    onClick={() => handleShareholderClick(shareIndex, name, index)}
                  >
                    {name}
                  </MyButton>
                ))}
              </td>

              {/* Value per person - only get 2 digits after the decimal */}
              <td>{item.per_share.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SpendTable;
