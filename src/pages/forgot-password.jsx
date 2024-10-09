import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Perform further actions, like submitting the data
    setSuccessMessage("Password confirmed successfully!");
  };

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
