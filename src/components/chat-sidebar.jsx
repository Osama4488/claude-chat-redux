// components/Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ chatHistory, onSelectChat }) => {
  return (
    <Box sx={{ width: '250px', bgcolor: 'background.paper', height: '100vh', overflowY: 'auto' }}>
      <List component="nav" aria-label="chat history">
        {chatHistory?.map((chat, index) => (
          <ListItem button key={index} onClick={() => onSelectChat(index)}>
            <ListItemText primary={`Chat ${index + 1}`} secondary={chat.request_txt} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
