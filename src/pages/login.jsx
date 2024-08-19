// "use client";

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   CircularProgress,
//   Link as MuiLink,
// } from "@mui/material";
// import { useToast } from "../context/ToastContext";

// export default function LoginForm() {
//   const { login, loading, error, resetError, state } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { showToast } = useToast();
//   const router = useRouter();

//   // Redirect to /app if the user is already authenticated
//   useEffect(() => {
//     if (state.authenticated) {
//       window.location.href = "/app";
//     }
//   }, [state.authenticated, router]);

//   // Reset error on component mount
//   useEffect(() => {
//     resetError();
//   }, [resetError]);

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await login(email, password);
//       console.log(state,"state after login failed")
//       if (error) {
//         showToast(error, "error");
//       } else {
//         // showToast("Login successful!", "success");
//         // window.location.href = "/app";
//       }
//     } catch (err) {
//       showToast("An error occurred during login.", "error");
//     }
//   };

//   return (
//     <Container
//       className="h-screen flex flex-col justify-center items-center gap-4"
//       maxWidth="sm"
//     >
//       <form onSubmit={onSubmit}>
//         <Box
//           sx={{
//             width: "100%",
//             padding: 4,
//             borderRadius: 1,
//             boxShadow: 3,
//             bgcolor: "background.paper",
//           }}
//         >
//           <Typography variant="h5" component="h1" gutterBottom>
//             Please log in to continue.
//           </Typography>
//           {error && (
//             <Typography variant="body2" color="error">
//               {error}
//             </Typography>
//           )}
//           <TextField
//             fullWidth
//             margin="normal"
//             id="email"
//             label="Email"
//             type="email"
//             name="email"
//             placeholder="Enter your email address"
//             required
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             id="password"
//             label="Password"
//             type="password"
//             name="password"
//             placeholder="Enter password"
//             required
//             variant="outlined"
//             inputProps={{ minLength: 6 }}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <LoginButton loading={state.loading} />
//         </Box>

//         <MuiLink component={Link} href="/signup" underline="none">
//           <Typography variant="body2" color="textSecondary">
//             No account yet?{" "}
//             <Typography
//               component="span"
//               fontWeight="fontWeightBold"
//               sx={{ textDecoration: "underline" }}
//             >
//               Sign up
//             </Typography>
//           </Typography>
//         </MuiLink>
//       </form>
//     </Container>
//   );
// }

// function LoginButton({ loading }) {
//   return (
//     <Button
//       type="submit"
//       fullWidth
//       variant="contained"
//       color="primary"
//       disabled={loading}
//       sx={{ mt: 3, mb: 2 }}
//     >
//       {loading ? <CircularProgress size={24} /> : "Log in"}
//     </Button>
//   );
// }
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { login, loading, error, resetError, state } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log(state,"state in login")
    if (state.authenticated) {
      window.location.href = "/app";
    }
  }, [state.authenticated, router]);

  useEffect(() => {
    resetError();
  }, [resetError]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      if (error) {
        toast.error(error, { toastId: "error-toast" });
      } else {
        toast.success("Login successful!", {
          toastId: "success-toast",
          autoClose: 5000,
        });
        window.location.href = "/app";

      }
    } catch (err) {
      toast.error("An error occurred during login.", { toastId: "error-toast" });
    }
  };

  return (
    <Container
      className="h-screen flex flex-col justify-center items-center gap-4"
      maxWidth="sm"
    >
      <form onSubmit={onSubmit}>
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
          <LoginButton loading={state.loading} />
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
      {loading ? <CircularProgress size={24} /> : "Log in"}
    </Button>
  );
}
