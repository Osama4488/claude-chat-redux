
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";

export default function ChatPanel({
  id,
  input,
  setInput,
  handleSend,
  sendingMessage,
  streaming,
  handleStopStreaming,
}) {
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);

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
  };

  useEffect(() => {
    base64Images.forEach((image, index) => {
      console.log(`Image ${index + 1}: ${image}`);
      // Send each image to the server or perform any other operations
    });
  }, [base64Images]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        maxWidth: "800px",
        left: "50%",
        transform: "translateX(-50%)",
        minWidth: "700px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        p: 2,
        backgroundColor: "#fff",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        // position: "relative",
    
        // maxWidth: "800px",
        // left: "50%",
        // transform: "translateX(-50%)",
        // minWidth: "700px",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        // p: 2,
       
       
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      <Container maxWidth="xl" className="px-0">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
            
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                
                <>
      <IconButton
        color="primary"
        component="label"
        htmlFor="upload-image-input"
        sx={{ mr: 1 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3L4 9H7V19H17V9H20L12 3Z"
            fill="currentColor"
          />
        </svg>
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          id="upload-image-input"
        />
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
        <Button
          onClick={handleSendWithImages}
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      )}
    </>
              ),
            }}
          />
       
          <Box sx={{ display: "flex", ml: 2 }}>
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





