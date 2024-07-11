"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";

export default function SignupForm() {
  const router = useRouter();

  const onSubmit = () => {};

  return (
    <Container
      className="h-screen flex flex-col justify-center items-center gap-4"
      maxWidth="sm"
    >
      <form action={onSubmit} className="">
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
          />
          <SignupButton />
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

function SignupButton() {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign up
    </Button>
  );
}
