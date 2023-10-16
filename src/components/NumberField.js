
import React from 'react';
import TextField from '@mui/material/TextField';

function ValueFieldInput(originalNumber, index, outerHandleChange) {
  let value = originalNumber;

  const handleChange = (event) => {
    let newValue = event.target.value;
    let delta = newValue - value;
    outerHandleChange(index, newValue, delta)
    value = newValue;
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

