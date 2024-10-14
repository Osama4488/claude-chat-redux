import React, { memo } from 'react';
import { TextareaAutosize } from '@mui/material';

const InputArea = memo(({ input, handleInputChange }) => {
  return (
    <TextareaAutosize
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
  );
});

// Set displayName to remove the error
InputArea.displayName = 'InputArea';

export default InputArea;
