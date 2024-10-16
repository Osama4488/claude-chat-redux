
import React, { useEffect, useState, memo } from 'react';
import moment from 'moment-timezone';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Typewriter from '../components/TypeWriter'; // Import Typewriter correctly

const Sidebar = ({ chatHistory, onSelectChat, selectedChatIndex, isLoading }) => {
  const userTimeZone = useSelector((state) => state.auth.user?.timeZone || 'UTC');

  const reversedChatHistory = [...chatHistory].reverse();

  return (
    <Box
      sx={{
        width: '300px',
        bgcolor: 'background.paper',
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
        borderRight: '1px solid #ddd',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            bgcolor: 'background.default',
            padding: 2,
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="95%"
              height={20}
              animation="wave"
              sx={{ borderRadius: '4px', marginBottom: '8px' }}
            />
          ))}
        </Box>
      ) : reversedChatHistory.length > 0 ? (
        <List component="nav" aria-label="chat history">
          {reversedChatHistory.map((chat, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => onSelectChat(reversedChatHistory.length - 1 - index)}
                sx={{
                  bgcolor: selectedChatIndex === reversedChatHistory.length - 1 - index ? 'primary.main' : 'transparent',
                  color: selectedChatIndex === reversedChatHistory.length - 1 - index ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: selectedChatIndex === reversedChatHistory.length - 1 - index ? 'primary.dark' : 'grey.100',
                  },
                  borderRadius: '8px',
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={index === 0 ? <Typewriter text={chat.title} /> : chat.title}
                  primaryTypographyProps={{
                    fontWeight:
                      selectedChatIndex === reversedChatHistory.length - 1 - index
                        ? 'bold'
                        : 'normal',
                  }}
                  secondary={
                    <div
                      style={{
                        color:
                          selectedChatIndex === reversedChatHistory.length - 1 - index
                            ? '#fff'
                            : '#888',
                        fontSize: '0.875rem',
                      }}
                    >
                      {moment.tz(chat.created_on, userTimeZone).format('MMM DD, YYYY hh:mm A')}
                    </div>
                  }
                />
              </ListItem>
              <Divider sx={{ my: 0.5, mx: 2 }} />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            color: 'text.secondary',
            padding: 2,
          }}
        >
          No prompts found. Start by entering a prompt to generate data like ChatGPT.
        </Box>
      )}
    </Box>
  );
};

// Export Sidebar using React.memo
export default memo(Sidebar);


