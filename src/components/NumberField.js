
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function ValueFieldInput(originalNumber, index, outerHandleChange) {
  const [value, setNumber] = useState(originalNumber);

  const handleChange = (event) => {
    let value = event.target.value;
    outerHandleChange(index, value)
    setNumber(value);
  };

  return (
    <TextField
      inputProps={{ step: "1000", min: 0}}
      id="standard-number"
      value={value}
      label="VND"
      type="number"
      variant="standard"
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}

    />
  );
}

export default ValueFieldInput;

