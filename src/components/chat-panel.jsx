"use client";

import React from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

export default function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
}) {
  const exampleMessages = [
    {
      heading: "What are the",
      subheading: "trending memecoins today?",
      message: "What are the trending memecoins today?",
    },
    {
      heading: "What is the price of",
      subheading: "$DOGE right now?",
      message: "What is the price of $DOGE right now?",
    },
    {
      heading: "I would like to buy",
      subheading: "42 $DOGE",
      message: "I would like to buy 42 $DOGE",
    },
    {
      heading: "What are some",
      subheading: "recent events about $DOGE?",
      message: "What are some recent events about $DOGE?",
    },
  ];

  return (
    <>
      <Box
        minWidth="600px"
        sx={{
          position: "fixed",
          bottom: 0,
          //   width: "100%",
          bgcolor: "background.paper",
          marginBottom: "20px",
        }}
      >
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },

              gap: 2,
              mb: 4,
            }}
          >
            {exampleMessages.map((example, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  //   display: { xs: "block", md: index > 1 ? "block" : "none" },
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {example.heading}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {example.subheading}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            {id && title && (
              <>
                <Button variant="outlined" startIcon={<IconShare />}>
                  Share
                </Button>
                {/* Placeholder for ChatShareDialog */}
              </>
            )}
          </Box>

          <Box
            sx={{
              borderTop: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              p: 2,
              boxShadow: 3,
              borderRadius: 1,
            }}
          >
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <Button variant="contained" color="primary">
                    Send
                  </Button>
                ),
              }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Footer Text
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

function IconShare() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 19.2C7.49 19.2 4 15.71 4 11.2C4 9.38 4.74 7.69 5.94 6.48L9.41 10.06L10.83 8.65L7.36 5.07C8.55 4.38 9.74 4 11.2 4C15.71 4 19.2 7.49 19.2 12C19.2 14.37 18.2 16.48 16.55 17.9L13.05 14.35L11.63 15.76L15.12 19.34C14.02 19.86 12.92 20 12 20C11.08 20 9.98 19.86 8.88 19.34L5.4 15.76L6.83 14.35L10.35 17.9C8.8 16.48 8 14.37 8 12C8 9.38 9.24 7.69 10.83 6.48L12 4.68L13.17 6.48C14.76 7.69 16 9.38 16 12C16 14.37 14.8 16.48 13.24 17.9L14.66 19.34L12 21.31V19.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
