import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function TextFieldInput(originalText) {
  const [text, setText] = useState(originalText);

  const handleChange = (event) => {
    setText(event.target.value);
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