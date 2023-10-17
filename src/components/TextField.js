import React from 'react';
import TextField from '@mui/material/TextField';

function TextFieldInput(originalText, index, outerHandleChange) {
  let text = originalText;
  const handleChange = (event) => {
    let newValue = event.target.value;
    outerHandleChange(index, newValue, text)
    text = newValue;
  };

  return (
    <TextField
      required={true}
      id="outlined-basic"
      variant="outlined"
      value={text}
      size='small'
      onChange={handleChange}
    />
  );
}

export default TextFieldInput;