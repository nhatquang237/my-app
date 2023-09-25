import React from 'react';

const DropdownList = (index, selectedOption, options, handleOptionChange) => {

  return (
    <div>
      <select name={index} value={selectedOption} onChange={handleOptionChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownList;
