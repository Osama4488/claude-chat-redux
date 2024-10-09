
import React, { useState, useRef, useCallback, memo } from "react";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  TextareaAutosize,
} from "@mui/material";

const ChatPanel = memo(function ChatPanel({
  input,
  handleSend,
  sendingMessage,
  handleInputChange,
}) {
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const textareaRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newBase64Images = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newBase64Images.push(reader.result);
        if (newBase64Images.length === files.length) {
          setBase64Images((prevBase64Images) => [
            ...prevBase64Images,
            ...newBase64Images,
          ]);
        }
      };
      if (file) {
        reader.readAsDataURL(file);
        setImages((prevImages) => [...prevImages, URL.createObjectURL(file)]);
      }
    });
  };

  // Send message along with images
  const handleSendWithImages = useCallback(() => {
    handleSend(input, base64Images);
    setBase64Images([]);
    setImages([]);
  }, [input, base64Images, handleSend]);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "700px",
        minWidth: "600px",
        width: "100%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        p: 2,
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl" className="px-0">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            id="upload-image-input"
          />
          <Box sx={{ mr: 2, display: "flex", alignItems: "center", width: "100%" }}>
            <TextareaAutosize
              ref={textareaRef}
              value={input}
              onChange={handleInputChange} // Optimized handler
              placeholder="Type your message..."
              minRows={2}
              maxRows={6}
              style={{
                width: "100%",
                minHeight: "40px",
                maxHeight: "120px",
                overflowY: "auto",
                resize: "none",
                borderRadius: "4px",
                padding: "8px",
                boxSizing: "border-box",
                fontSize: "16px",
                lineHeight: "1.5",
                fontFamily: "inherit",
                outline: "none",
                border: "none",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <IconButton
              color="primary"
              component="label"
              htmlFor="upload-image-input"
              sx={{ mr: 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </IconButton>

            {sendingMessage ? (
              <CircularProgress size={24} />
            ) : (
              <StreamButton onClick={handleSendWithImages} sx={{ ml: 1 }} />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

function StreamButton({ onClick, sx }) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      sx={{
        height: 32,
        minWidth: 32,
        borderRadius: "50%",
        backgroundColor: "#007bff",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        ...sx,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L4 10H8V20H16V10H20L12 2Z" fill="currentColor" />
      </svg>
    </Button>
  );
}

export default ChatPanel;
