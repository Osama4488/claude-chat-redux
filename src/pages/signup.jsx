import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, resetError } from '../store/authSlice';
import Link from 'next/link';
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
import { useRouter } from 'next/router';

export default function SignupForm() {
  const dispatch = useDispatch();
  const { authenticated, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push('/app');
    }
  }, [authenticated, router]);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  // const onSubmit = async (event) => {
  //   event.preventDefault();
    

  //   dispatch(signup({ email, password }))
  //     .unwrap()
  //     .then(() => {
  //       toast.success('Signup successful!', {
  //         toastId: 'success-toast',
  //       });
  //     })
  //     .catch(() => {
  //       toast.error(error, { toastId: 'error-toast' });
  //     });
  // };
  const onSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { toastId: "error-toast" });
      return;
    }
  
    dispatch(signup({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Signup successful!", { toastId: "success-toast" });
      })
      .catch((err) => {
        toast.error(err || error, { toastId: "error-toast" });
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
            Please sign up to continue.
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
          <TextField
            fullWidth
            margin="normal"
            id="confirm-password"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SignupButton loading={loading} />
        </Box>

        <MuiLink component={Link} href="/login" underline="none">
          <Typography variant="body2" color="textSecondary">
            Already have an account?{' '}
            <Typography
              component="span"
              fontWeight="fontWeightBold"
              sx={{ textDecoration: 'underline' }}
            >
              Log in
            </Typography>
          </Typography>
        </MuiLink>
      </form>
    </Container>
  );
}

function SignupButton({ loading }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={loading}
      sx={{ mt: 3, mb: 2 }}
    >
      {loading ? <CircularProgress size={24} /> : 'Sign up'}
    </Button>
  );
}
