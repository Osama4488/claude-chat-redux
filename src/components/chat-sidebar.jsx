// components/Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const Sidebar = ({ chatHistory, onSelectChat, selectedChatIndex, isLoading }) => {
  return (
    <Box sx={{ width: '250px', bgcolor: 'background.paper', height: '100vh', overflowY: 'auto' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <List component="nav" aria-label="chat history">
          {chatHistory?.map((chat, index) => (
            <ListItem
              button
              key={index}
              onClick={() => onSelectChat(index)}
              sx={{
                bgcolor: selectedChatIndex === index ? 'grey.300' : 'transparent',
                '&:hover': {
                  bgcolor: selectedChatIndex === index ? 'grey.400' : 'grey.100',
                },
              }}
            >
              <ListItemText primary={`Chat ${index + 1}`} secondary={chat.request_txt} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Sidebar;
