import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetError } from '../store/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { toast } from 'react-toastify';
import { checkAuthAndSetState } from '../utils/authUtils';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { authenticated, loading, error } = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.auth || []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // useEffect(() => {
  //   // const isAuthenticated = checkAuthAndSetState(dispatch);
  //   // if (isAuthenticated) {
  //   //   router.push("/app");
  //   // }
  //   console.log(userState,"userState in login page")
  //   console.log(authenticated,"authenticated in login page")
  //   if (authenticated) {
  //     router.push("/app");
  //   }
  // }, [authenticated, router,dispatch]);
  useEffect(() => {
    const checkAuthStatus = async () => {
      const isAuthenticated = await checkAuthAndSetState(dispatch);
      console.log(isAuthenticated,"isAuthenticated in login")
      if (isAuthenticated) {
        router.push("/app");
      }
    };
  
    checkAuthStatus();
  }, [dispatch, router]);
  

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        
        toast.success('Login successful!', {
          toastId: 'success-toast',
        });
        // window.location.href = '/app';
      })  
      .catch(() => {
        toast.error(error, { toastId: 'error-toast' });
      });
  };

  return (
    <Container
      className="h-screen flex flex-col justify-center items-center gap-4"
      maxWidth="sm"
    >
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            width: '100%',
            padding: 4,
            borderRadius: 1,
            boxShadow: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Please log in to continue.
          </Typography>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            variant="outlined"
            inputProps={{ minLength: 6 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton loading={loading} />
        </Box>

        <MuiLink component={Link} href="/signup" underline="none">
          <Typography variant="body2" color="textSecondary">
            No account yet?{' '}
            <Typography
              component="span"
              fontWeight="fontWeightBold"
              sx={{ textDecoration: 'underline' }}
            >
              Sign up
            </Typography>
          </Typography>
        </MuiLink>
      </form>
    </Container>
  );
}

function LoginButton({ loading }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={loading}
      sx={{ mt: 3, mb: 2 }}
    >
      {loading ? <CircularProgress size={24} /> : 'Log in'}
    </Button>
  );
}
