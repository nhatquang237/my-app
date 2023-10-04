import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function TextFieldInput(originalText, index, outerHandleChange) {
  const [text, setText] = useState(originalText);

  const handleChange = (event) => {
    let value = event.target.value;
    outerHandleChange(index, value)
    setText(value);
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