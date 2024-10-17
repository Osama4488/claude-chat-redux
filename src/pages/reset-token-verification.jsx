// import React, { useState } from "react";
// import { Box, TextField, Button, Typography } from "@mui/material";

// const PasswordForm = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     // Perform further actions, like submitting the data
//     setSuccessMessage("Password confirmed successfully!");
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         maxWidth: "400px",
//         margin: "auto",
//         mt: 5,
//         p: 3,
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         borderRadius: "8px",
//       }}
//     >
//       <Typography variant="h5" mb={2}>
//         Set Your Password
//       </Typography>

//       <TextField
//         label="Password"
//         type="password"
//         variant="outlined"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         sx={{ mb: 2 }}
//         required
//       />

//       <TextField
//         label="Confirm Password"
//         type="password"
//         variant="outlined"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         sx={{ mb: 2 }}
//         required
//       />

//       {error && (
//         <Typography color="error" sx={{ mb: 2 }}>
//           {error}
//         </Typography>
//       )}

//       {successMessage && (
//         <Typography color="primary" sx={{ mb: 2 }}>
//           {successMessage}
//         </Typography>
//       )}

//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default PasswordForm;


import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract the email (u) and token (t) from the query parameters
  const email = searchParams.get("u");
  const token = searchParams.get("t");

  useEffect(() => {
    // Verify the token as soon as the component mounts
    const verifyToken = async () => {
      try {
        const response = await axios.post("http://localhost:5123/api/verify-token", {
          email,
          token,
        });

        if (response.data.valid) {
          setIsTokenValid(true);
        } else {
          setError("Invalid or expired token.");
        }
      } catch (error) {
        setError("Token verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Call the API to reset the password
    try {
      const response = await axios.post("http://localhost:5123/api/reset-password", {
        email,
        token,
        password,
      });

      if (response.data.success) {
        setSuccessMessage("Password reset successfully!");
        // Optionally navigate to the login page or another page
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError("Password reset failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!isTokenValid) {
    return (
      <Typography color="error">
        {error || "The token is invalid or expired."}
      </Typography>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" mb={2}>
        Set Your Password
      </Typography>

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 2 }}
        required
      />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {successMessage && (
        <Typography color="primary" sx={{ mb: 2 }}>
          {successMessage}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default PasswordForm;
