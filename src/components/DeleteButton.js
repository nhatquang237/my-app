import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: red
  },
});


function DeleteButton(props) {
  // Extract custom props
  // Below is shortcut to define multi var or const. But only achive when variable name equal to key in props object
  // Have a look at below link to get more
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

  const { variant, color, isShare,...restProps } = props;

  const onClickHandle = () => {
    restProps.onClick()
  }

  return (

    <ThemeProvider theme={theme}>
      <Button
        color={theme.primary}
        variant="contained"
        onClick={onClickHandle}
      >
        X
      </Button>
    </ThemeProvider>
  );
}

export default DeleteButton;
