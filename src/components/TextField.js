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
      id="outlined-basic"
      variant="outlined"
      value={text}
      onChange={handleChange}
      size='small'
    />
  );
}

export default TextFieldInput;