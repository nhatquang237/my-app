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

function MyButton(props) {
  // Extract custom props
  const { variant, color, isShare,...restProps } = props;

  const [share, setShare] = useState(isShare);

  const nestedHandle = () => {
    if(restProps.onClick()){
      setShare(!share)
    }
  }

  return (

    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color={colorCheck(share)} sx={{ ml: 2 }}
        onClick={nestedHandle}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
}

export default MyButton;
