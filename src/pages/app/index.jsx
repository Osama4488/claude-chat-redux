

import React, { useState, useRef, useEffect,useCallback  } from "react";
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
import { fetchHistory, setUserHistory } from "../../store/authSlice";
import { FaBullseye } from "react-icons/fa6";

const Chat = ({ id, className, session }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const chatHistory = useSelector((state) => state.auth.user?.userHistory || []);
  const userState = useSelector((state) => state.auth || []);
  const isLoading = useSelector((state) => state.auth.loading);
  const [input, setInput] = useState("");
  const [responseStream, setResponseStream] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistoryLoads, setChatHistoryLoads] = useState(false);
  const [isFetchStart, setFetchStart] = useState(false);
  const [streamingStatus, setStreamingStatus] = useState({});

  const animationRef = useRef(null);

  useEffect(() => {
    console.log("userState", userState);
  }, [chatHistory, isLoading]);

  useEffect(() => {
    posthog.capture('$pageview');
  }, []);

  useEffect(() => {
    console.log(" }, [selectedChat, chatHistory]); called");
    if (selectedChat !== null) {
      const selectedChatData = chatHistory[selectedChat];
      if (selectedChatData) {
        setResponseStream([selectedChatData.response_txt || ""]);
      }
    }
  }, [selectedChat, chatHistory]);

  useEffect(() => {
    console.log('isFetchStart] called');
    if (userState?.email && !chatHistoryLoads  && isFetchStart) {
      console.log('fetchAndSetHistory called');
      fetchAndSetHistory(userState?.email);
    }
  }, [isFetchStart ]);

  const fetchResponse = useCallback(  async (sanitizedInput) => {
    try {
      setSelectedChat(null);
      setSendingMessage(true);

      posthog.capture('message_sent', {
        user: session?.user?.email,
        message: sanitizedInput,
      });

      const apiUrl = `https://junaid121e2e-001-site1.ctempurl.com/api/ResponseGeneration/TextResponseGenerator`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          response_txt: "",
          request_txt: sanitizedInput,
          email: userState?.email,
          base64Image: "",
          prompt: ""
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setFetchStart(true);

      const reader = response.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();

      if (!reader) return;

      let streamData = "";
      const words = [];
      let currentIndex = 0;

      const renderWords = (timestamp) => {
        if (currentIndex < words.length) {
          setResponseStream((prevStream) => [
            ...prevStream,
            words[currentIndex] + " ",
          ]);
          currentIndex++;
        } else {
          setSendingMessage(false);
          cancelAnimationFrame(animationRef.current);
          return;
        }

        animationRef.current = requestAnimationFrame(renderWords);
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        streamData += value;
        words.push(...value.split(" "));
      }

      animationRef.current = requestAnimationFrame(renderWords);

      posthog.capture('chat_history_loaded', {
        user: session?.user?.email,
        historyLength: chatHistory.length,
      });

      const newChatIndex = chatHistory.length;
      setSelectedChat(newChatIndex);
      handleSelectChat(newChatIndex);

    } catch (error) {
      console.error("Error fetching response:", error);
      setSendingMessage(false);
      cancelAnimationFrame(animationRef.current);
    }
  })


  const fetchAndSetHistory = async (email) => {
    try {
      setChatHistoryLoads(true);

      const historyData = await fetchHistory(email);
      console.log(historyData, "historyData in fetchresponse");
      dispatch(setUserHistory(historyData));
    } catch (error) {
      console.error("Error fetching user history:", error);
      // Handle errors as needed
    } finally {
      setChatHistoryLoads(false);
    }
  };

  const handleSend = async () => {
    setFetchStart(false)
    if (input.trim() === "") {
      toast.error("Input cannot be empty.");
      return;
    }

    const sanitizedInput = input.trim();
    setInput("");
    setResponseStream([]);

    console.log("await fetchResponse(sanitizedInput); called");
    await fetchResponse(sanitizedInput);
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);
  };

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, [setInput]);
  

  return (
    <>
      <Header />
      <div
        style={{
          height: 'calc(100vh - 60px)',
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
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: 'calc(100vh - 60px)',
            overflowY: 'scroll',
            overflowX: "hidden"
          }}
        >
          {responseStream.length > 0 ? (
            <div className="no-scrollbar">
              <CodeBlock code={responseStream.join('')} />
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
