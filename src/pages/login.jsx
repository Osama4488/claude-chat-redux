"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
// import { authenticate } from "@/app/login/actions";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
// import { getMessageFromCode } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  //   const [result, dispatch] = useFormState(authenticate, undefined);

  //   useEffect(() => {
  //     if (result) {
  //       if (result.type === "error") {
  //         toast.error(getMessageFromCode(result.resultCode));
  //       } else {
  //         toast.success(getMessageFromCode(result.resultCode));
  //         router.refresh();
  //       }
  //     }
  //   }, [result, router]);

  const onSubmit = () => {};
  return (
    <Container
      className="h-screen flex flex-col justify-center items-center gap-4 "
      maxWidth="sm"
    >
      {/* onSubmit={dispatch} */}
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
            Please log in to continue.
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
          <LoginButton />
        </Box>

        <MuiLink component={Link} href="/signup" underline="none">
          <Typography variant="body2" color="textSecondary">
            No account yet?{" "}
            <Typography
              component="span"
              fontWeight="fontWeightBold"
              sx={{ textDecoration: "underline" }}
            >
              Sign up
            </Typography>
          </Typography>
        </MuiLink>
      </form>
    </Container>
  );
}

function LoginButton() {
  //   const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      //   disabled={pending}
      sx={{ mt: 3, mb: 2 }}
    >
      {/* {pending ? <CircularProgress size={24} /> : "Log in"} */}
      Log in
    </Button>
  );
}
