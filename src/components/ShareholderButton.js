import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: green,
    secondary: grey,
  },
});

// Define the button's style based on the state
const colorCheck = (isShare) => {
  const color = isShare ? 'primary' : 'secondary'
  return color
};

function ShareholderButton(props) {
  // Extract custom props
  // Below is shortcut to define multi var or const. But only achive when variable name equal to key in props object
  // Have a look at below link to get more
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  const { variant, color, isShare, id, ...restProps } = props;

  const [share, setShare] = useState(isShare);

  const onClickHandle = (event) => {
    if(restProps.onClick(event)){
      setShare(!share)
    }
  }

  return (

    <ThemeProvider theme={theme}>
      <Button
        id={id}
        variant="contained"
        color={colorCheck(share)} sx={{ ml: 2 }}
        onClick={onClickHandle}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
}

export default ShareholderButton;
