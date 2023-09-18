import React, { useState } from 'react';

const BasicTable = (number_of_items) => {
  // Sample data for the table
  const data = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' },
    { id: 4, name: 'Item 4', description: 'Description 4' },
    { id: 5, name: 'Item 5', description: 'Description 5' },
    { id: 6, name: 'Item 6', description: 'Description 6' },
    { id: 7, name: 'Item 7', description: 'Description 7' },
    { id: 8, name: 'Item 8', description: 'Description 8' },
    { id: 9, name: 'Item 9', description: 'Description 9' },
    { id: 10, name: 'Item 10', description: 'Description 10' },
  ];

  // State to track the current page
  // The parameter inside useState function is the initialState or initial value of number,
  // or we can say that is default value
  const [number, setNumber] = useState(number_of_items);
  const [name, setName] = useState('Quang');

  // Slice the data array to display only the items for the current page
  let displayedData = data.slice(0, number);

  // Function to handle page navigation
  const handlePageChange = (value) => {
    // setNumber is not explicitly defined in our component code,
    // it's provided by React when you call useState, and you can use it to set the value of count as needed
    setNumber(value);
  };

  const onNameChange = (event) => {
    console.log('Name changed');
    setName(event.target.value);
  }

  return (
    <>
      {/* Testing input field */}
      <div>
        {/* Input field to take all input */}
        <input value={name} type="text"
          onChange={(event) => onNameChange(event)}
        ></input>
        {/* Label to present name that typed in input field */}
        <br></br>
        Halo master {name}. Have a good day!!!
      </div>
      {/* Increasement button */}
      <div>
        <button
          onClick={() => handlePageChange(number - 1)}
          disabled={number === 1}
        >
        {/* Minus button */}
          -
        </button>
        <button
          onClick={() => handlePageChange(number + 1)}
          disabled={number >= data.length}
        >
          {/* Plus button */}
          +
        </button>
      </div>
      {/* Table of items */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>

        </tfoot>
      </table>
    </>
  );
};

export default BasicTable;
