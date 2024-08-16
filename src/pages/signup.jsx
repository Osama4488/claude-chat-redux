"use client";

import React, { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import Link from "next/link";
import { toast } from "sonner";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";

export default function SignupForm() {
  const { signup, loading, error,resetError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    resetError();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

   
    await signup(email, password, confirmPassword);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Signup successful!");
    }
  };
  return (
    <Container
      className="h-screen flex flex-col justify-center items-center gap-4"
      maxWidth="sm"
    >
      <form onSubmit={onSubmit} className="">
        <Box
          sx={{
            width: "100%",
            padding: 4,
            borderRadius: 1,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Sign up to create an account.
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
            onChange={(e) => setPassword(e.target.value)}

          />
          <TextField
            fullWidth
            margin="normal"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            variant="outlined"
            inputProps={{ minLength: 6 }}
            onChange={(e) => setConfirmPassword(e.target.value)}

          />
          <SignupButton loading={loading} />
        </Box>

        <MuiLink component={Link} href="/login" underline="none">
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Typography
              component="span"
              fontWeight="fontWeightBold"
              sx={{ textDecoration: "underline" }}
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
      {loading ? <CircularProgress size={24} /> : "Sign up"}
    </Button>
  );
}
