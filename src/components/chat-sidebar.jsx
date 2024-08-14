
// import React from 'react';
// import moment from 'moment-timezone';
// import { Box, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = ({ chatHistory, onSelectChat, selectedChatIndex, isLoading }) => {
//   // Assuming you have a way to get the user's time zone from the context or API
//   const { state } = useAuth();
//   const userTimeZone = state.user?.timeZone || 'UTC'; // Fallback to UTC if time zone is not available

//   return (
//     <Box sx={{ width: '250px', bgcolor: 'background.paper', height: '100vh', overflowY: 'auto' }}>
//       {isLoading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <List component="nav" aria-label="chat history">
//           {chatHistory?.map((chat, index) => (
//             <ListItem
//               button
//               key={index}
//               onClick={() => onSelectChat(index)}
//               sx={{
//                 bgcolor: selectedChatIndex === index ? 'grey.300' : 'transparent',
//                 '&:hover': {
//                   bgcolor: selectedChatIndex === index ? 'grey.400' : 'grey.100',
//                 },
//               }}
//             >
//               <ListItemText
//                 primary={chat.request_txt}
//                 secondary={
//                   <div className="text-gray-500 text-sm">
//                     {moment.tz(chat.created_on, userTimeZone).format('MMM DD, YYYY hh:mm A')}
//                   </div>
//                 }
//               />
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// };

// export default Sidebar;




import React from 'react';
import moment from 'moment-timezone';
import { Box, List, ListItem, ListItemText, CircularProgress, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ chatHistory, onSelectChat, selectedChatIndex, isLoading }) => {
  const { state } = useAuth();
  const userTimeZone = state.user?.timeZone || 'UTC'; // Fallback to UTC if time zone is not available

  return (
    <Box
      sx={{
        width: '300px', // Slightly wider for better layout
        bgcolor: 'background.paper',
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
        borderRight: '1px solid #ddd', // Subtle border on the right
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            bgcolor: 'background.default',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List component="nav" aria-label="chat history">
          {chatHistory?.map((chat, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => onSelectChat(index)}
                sx={{
                  bgcolor: selectedChatIndex === index ? 'primary.main' : 'transparent',
                  color: selectedChatIndex === index ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: selectedChatIndex === index ? 'primary.dark' : 'grey.100',
                  },
                  borderRadius: '8px', // Rounded corners
                  mb: 1, // Margin bottom for spacing
                }}
              >
                <ListItemText
                  primary={chat.request_txt}
                  primaryTypographyProps={{ fontWeight: selectedChatIndex === index ? 'bold' : 'normal' }}
                  secondary={
                    <div style={{ color:selectedChatIndex === index ? "#fff" : '#888', fontSize: '0.875rem' }}>
                      {moment.tz(chat.created_on, userTimeZone).format('MMM DD, YYYY hh:mm A')}
                    </div>
                  }
                />
              </ListItem>
              <Divider sx={{ my: 0.5, mx: 2 }} /> {/* Stylish divider */}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Sidebar;
