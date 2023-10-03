
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function ValueFieldInput(originalNumber) {
  const [value, setNumber] = useState(originalNumber);

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <TextField
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

