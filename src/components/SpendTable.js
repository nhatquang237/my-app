import React, { useState } from 'react';
import { Button } from '@mui/material';
import Spend from './spendData.js';

const SpendTable = (number_of_spend) => {
  // Sample data for the table

  var spendData = [
    { name: 'Water', value: 10, payer: 'Quang', shareholder: ['Quang', 'Tai', 'Phuc', 'Thanh'] },
    { name: 'Electricity ', value: 100, payer: 'Quang', shareholder: ['Quang', 'Tai', 'Phuc', 'Thanh'] },
    { name: 'Stuff', value: 20, payer: 'Phuc', shareholder: ['Quang', 'Tai', 'Phuc', 'Thanh'] },
    { name: 'Book', value: 5, payer: 'Quang'},
  ]
  // Create an array of Spend objects
  let spends = [];
  function initSpend (input_data) {
    let newObject = new Spend(input_data);
    spends.push(newObject);
  }
  spendData.forEach(initSpend);

  // State to track the current page
  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  const [number, setNumber] = useState(number_of_spend);

  // Slice the data array to display only the items for the current page
  let displayedData = spends.slice(0, number);

  // Function to handle page navigation
  const handlePageChange = (value) => {
    // setNumber is not explicitly defined in our component code,
    // it's provided by React when you call useState, and you can use it to set the value of count as needed
    setNumber(value);
  };


  return (
    <>
      {/* Increasement buttons */}
      <div>
        <Button
          onClick={() => handlePageChange(number - 1)}
          disabled={number === 1}
        >
        {/* Minus button */}
          -
        </Button>
        <Button
          onClick={() => handlePageChange(number + 1)}
          disabled={number >= spends.length}
        >
          {/* Plus button */}
          +
        </Button>
      </div>
      {/* Table of spend */}
      <table>
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
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.payer}</td>
              <td>{item.shareholder.toString()}</td>
              <td>{item.per_share}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SpendTable;
