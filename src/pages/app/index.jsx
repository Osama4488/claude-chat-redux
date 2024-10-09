import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ChatPanel from "../../components/chat-panel";
import Sidebar from "../../components/chat-sidebar";
import Header from "../../layout/header";
import { toast } from "react-toastify";
import posthog from "../../lib/posthog";
import CodeBlock from "../../components/code-block";
import EmptyScreen from "../../components/empty-screen";
import PrivateRoute from "../../layout/PrivateRoute";
import { setUserHistory } from "../../store/authSlice";
import { fetchHistory } from "../../utils/authUtils";
import Cookies from 'js-cookie';


const Chat = ({ id, className, session }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const accessToken = Cookies.get('accessToken');
  const chatHistory = useSelector(
    (state) => state.auth.user?.userHistory || []
  );
  const userState = useSelector((state) => state.auth || []);
  const isLoading = useSelector((state) => state.auth.loading);
  const [input, setInput] = useState("");
  const [responseStream, setResponseStream] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistoryLoads, setChatHistoryLoads] = useState(false);

  const workerRef = useRef(null);

  useEffect(() => {
    try {
      workerRef.current = new Worker("/Chat-Worker.js");
      console.log("Worker initialized:", workerRef.current);
    } catch (error) {
      console.error("Error initializing worker:", error);
    }
  }, []);

  // In the main thread
  useEffect(() => {
    workerRef.current.onmessage = (event) => {
      const { type, payload } = event.data;

      if (type === "responseStream") {
        setResponseStream((prev) => [
          ...prev,
          ...payload.map((word) => `${word} `),
        ]);
        setSendingMessage(false);
      }

      if (type === "streamComplete") {
        // When the stream is fully complete, fetch the updated history
        console.log("Stream complete, fetching updated history...");
        fetchAndSetHistory(userState?.email); // Fetch history here
      }
    };
  }, []);

  useEffect(() => {
    posthog.capture("$pageview");
  }, []);

  useEffect(() => {
    if (selectedChat !== null) {
      const selectedChatData = chatHistory[selectedChat];
      if (selectedChatData) {
        setResponseStream([selectedChatData.response_txt || ""]);
      }
    }
  }, [selectedChat, chatHistory]);

  const fetchAndSetHistory = async (email) => {
    try {
      setChatHistoryLoads(true);

      const historyData = await fetchHistory(email);
      console.log(historyData, "historyData in fetchresponse");

      // Dispatch the fetched history to Redux
      dispatch(setUserHistory(historyData));

      // Check if historyData is not empty
      if (historyData.length > 0) {
        // Set the selected chat to the last index
        setSelectedChat(historyData.length - 1);
      } else {
        // Optionally handle the case where no history is found
        setSelectedChat(null);
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
      // Handle errors as needed
    } finally {
      setChatHistoryLoads(false);
    }
  };

  const handleSend = (sanitizedInput, email) => {
    const worker = new Worker("/Chat-Worker.js");
    setSelectedChat(null);
    setInput("");
    setResponseStream([]);
    // Start fetching chat response and history in parallel

    workerRef.current.postMessage({
      type: "fetchResponse",
      payload: { sanitizedInput, email: userState?.email, token: accessToken,  },
    });

    setSendingMessage(true);
    // Listen to the stream of chat messages and update UI
    worker.onmessage = async (event) => {
      const { type, payload } = event.data;

      switch (type) {
        case "responseStream":
          // Update the main chat window with the new message
          appendToChatWindow(payload);
          break;

        case "fetchHistory":
          // Fetch and set the chat history when instructed by the worker
          await fetchAndSetHistory(payload);
          break;

        default:
          console.error("Unknown message type from worker:", type);
          break;
      }
    };
  };

  const handleSelectChat = useCallback((index) => {
    setSelectedChat(index);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      setInput(e.target.value);
    },
    [setInput]
  );

  return (
    <>
      <Header />
      <div
        className="main-container"
        style={{
          display: "flex",
          height: "calc(100vh - 60px)",
          width: "100%",
        }}
      >
       
        <div
          className="sidebar-container"
          style={{
            width: "300px",
            overflowY: "auto",
          }}
        >
          <Sidebar
            chatHistory={chatHistory}
            selectedChatIndex={selectedChat}
            onSelectChat={handleSelectChat}
            isLoading={chatHistoryLoads}
          />
        </div>

     
        <div
          className="chat-content-container"
          style={{
            flexGrow: 1,
            position: "relative",
            overflowY: "auto",
            alignItems:"center"
          }}
        >
          <Box
            className="chat-content"
            sx={{
              flexGrow: 1,
              p: 2,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              paddingBottom: "100px", 
              
            }}
          >
            {responseStream.length > 0 ? (
              <div className="no-scrollbar">
                <CodeBlock code={responseStream.join("")} />
              </div>
            ) : (
              <EmptyScreen />
            )}
          </Box>

        
        
           {/* Chat Panel fixed at the bottom */}
           <Box
  sx={{
    position: "fixed", // Keep it fixed to stay at the bottom while scrolling
    bottom: 0, // Stays at the bottom of the viewport
    // left: "50%", // Horizontally centered in the viewport
    // transform: "translateX(-50%)", // Ensure it's centered
    width: "100%", // Takes full width
    maxWidth: "700px", // Limit width to 700px
    minWidth: "600px", // Minimum width constraint
    p: 2,
    backgroundColor: "#fff",
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
    borderTop: "1px solid #e0e0e0",
 

  }}
>
  <ChatPanel
    input={input}
    handleSend={handleSend}
    sendingMessage={sendingMessage}
    handleInputChange={handleInputChange}
  />
</Box>

        </div>
      </div>
    </>

  
    
  );
};

export default PrivateRoute(Chat);
