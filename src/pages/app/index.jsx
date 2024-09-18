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

import { FaBullseye } from "react-icons/fa6";

const Chat = ({ id, className, session }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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

  // const fetchAndSetHistory = async (email) => {
  //   try {
  //     setChatHistoryLoads(true);

  //     const historyData = await fetchHistory(email);
  //     console.log(historyData, "historyData in fetchresponse");
  //     dispatch(setUserHistory(historyData));
  //   } catch (error) {
  //     console.error("Error fetching user history:", error);
  //     // Handle errors as needed
  //   } finally {
  //     setChatHistoryLoads(false);
  //   }
  // };
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
  

  const handleSend = async () => {
    if (input.trim() === "") {
      toast.error("Input cannot be empty.");
      return;
    }

    setSelectedChat(null)
    const sanitizedInput = input.trim();
    setInput("");
    setResponseStream([]);

    // Send the sanitized input to the worker to fetch the response
    workerRef.current.postMessage({
      type: "fetchResponse",
      payload: { sanitizedInput, email: userState?.email },
    });

    setSendingMessage(true); // Set sending message state to true
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);
  };

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
        style={{
          height: "calc(100vh - 60px)",
        }}
        className="w-full flex justify-between overflow-hidden"
      >
        <Sidebar
          chatHistory={chatHistory}
          selectedChatIndex={selectedChat}
          onSelectChat={handleSelectChat}
          isLoading={chatHistoryLoads}
        />

        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            height: "calc(100vh - 60px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {responseStream.length > 0 ? (
            <div className="no-scrollbar">
              <CodeBlock code={responseStream.join("")} />
            </div>
          ) : (
            <EmptyScreen />
          )}
          <ChatPanel
            input={input}
            handleSend={handleSend}
            sendingMessage={sendingMessage}
            responseStream={responseStream}
            setInput={setInput}
            handleInputChange={handleInputChange}
          />
        </Box>
      </div>
    </>
  );
};

export default PrivateRoute(Chat);
