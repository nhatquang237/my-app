import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import User from '../data/User.js';
import VerificationForm from './Verification.js'
import { validateEmail } from '../utils/StringUtils.js';
import { addUser, authenticate, checkEmail } from '../data/UserData.js';
// import GoogleLoginButton from './GoogleLoginButton.js';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [passcode, setPasscode] = useState('');
  const [newUser, setNewUser] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entered_email = data.get('email');

    // Validate entered value of email
    if (!validateEmail(entered_email)) {
      setError('Please enter valid email address');
      return
    }

    // Check if email was exist in database
    const check_response = await checkEmail(entered_email);
    const is_exist = check_response;
    if (is_exist) {
      setError('Email already exist.')
      return
    }

    // Create a new User
    const user = new User({ 'username': entered_email, 'password': data.get('password') });
    setNewUser(user)

    try {
      const code = await authenticate(entered_email);
      if (code) {
        setPasscode(code)
      }
      setError('');
    }
    catch (error) {
      setError(error);
    }
  };

  // Event handler for verification code submission
  const submitCode = async (code) => {
    // Do something with the combined verification code (e.g., send it to a server)
    console.log('Combined Verification Code:', code);
    if (code === passcode) {
      await addUser(newUser)
      navigate('/login');
    }
  };

  const handleSuccess = (response) => {
    console.log('Login successful:', response);
    // Handle successful login here (e.g., set user state, redirect, etc.)
  };

  const handleFailure = (error) => {
    console.error('Login failed:', error);
    // Handle failed login here
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  disabled={Boolean(passcode)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                // autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={Boolean(passcode)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={Boolean(passcode)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              {!passcode &&
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              }
            </Grid>
          </Box>
        </Box>
        <Grid item xs={12}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Grid>

        {/* Code verification */}
        {passcode &&
          <VerificationForm
            submitCode={(code) => submitCode(code)}
          ></VerificationForm>
        }

      </Container>
      {/* <Container>
        <h1>Sign in with Google</h1>
        <GoogleLoginButton onSuccess={handleSuccess} onFailure={handleFailure} />
      </Container> */}
    </ThemeProvider>
  );
}
