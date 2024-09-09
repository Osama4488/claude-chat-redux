

import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  IconButton,
  inputAdornmentClasses,
} from "@mui/material";

export default function ChatPanel({
  id,
  input,
  setInput,
  handleSend,
  sendingMessage,
  streaming,
  handleStopStreaming,
  handleInputChange
}) {
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [newInput,setNewInput]= useState()
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

  const handleSendWithImages = () => {
    handleSend(input, base64Images);


    setBase64Images([]);
    setImages([]);
    setInput(""); // Clear the textarea
  };

  useEffect(() => {
    base64Images.forEach((image, index) => {
      console.log(`Image ${index + 1}: ${image}`);
      // Send each image to the server or perform any other operations
    });
  }, [base64Images]);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  }, [input]);

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
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            id="upload-image-input"
          />
          <Box sx={{ mr: 2, display: "flex", alignItems: "center", width: "100%" }}>
            <textarea
              ref={textareaRef}
              // value={input}
              value={input}
              // onChange={(e) => setInput(e.target.value)}
              onChange={(e) => handleInputChange(e)}
              placeholder="Type your message..."
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
                outline: "none"
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
             
      <IconButton
  color="primary"
  component="label"
  htmlFor="upload-image-input"
  sx={{ mr: 1 }}
>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z" clip-rule="evenodd"></path></svg>
</IconButton>


              {sendingMessage ? (
                <CircularProgress size={24} />
              ) : streaming ? (
                <Button
                  onClick={handleStopStreaming}
                  variant="contained"
                  color="secondary"
                  startIcon={<StopIcon />}
                >
                  Stop
                </Button>
              ) : (
                <StreamButton
                  onClick={handleSendWithImages}
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {images.map((image, index) => (
              <Box
                key={index}
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                  borderRadius: "50%",
                  ml: index > 0 ? 1 : 0,
                  objectFit: "cover",
                }}
                src={image}
                alt={`Uploaded ${index + 1}`}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function StreamButton({ onClick, sx }) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      sx={{
        height: 32, // Fixed height
        minWidth: 32, // Fixed width to make it small and round
        borderRadius: '50%', // Fully rounded button
        backgroundColor: "#007bff", // Blue background
        color: "#fff", // White text color
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0, // Remove extra padding to maintain round shape
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
        <path
          d="M12 2L4 10H8V20H16V10H20L12 2Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}

function StopIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6H18V18H6V6Z"
        fill="currentColor"
      />
    </svg>
  );
}
