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

export default function LoginForm() {
  const { login, loading, error,resetError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    resetError();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Login successful!");
    }
  };

  return (
    <Container className="h-screen flex flex-col justify-center items-center gap-4" maxWidth="sm">
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
            No account yet?{" "}
            <Typography component="span" fontWeight="fontWeightBold" sx={{ textDecoration: "underline" }}>
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
    <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
      {loading ? <CircularProgress size={24} /> : "Log in"}
    </Button>
  );
}
