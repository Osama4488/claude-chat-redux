

// import React, { useState, useRef, useEffect } from "react";
// import { Box } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// // import { fetchHistory } from "../../store/authSlice";
// import ChatPanel from "../../components/chat-panel";
// import Sidebar from "../../components/chat-sidebar";
// import Header from "../../layout/header";
// import { toast } from "react-toastify";
// import posthog from "../../lib/posthog";
// import CodeBlock from "../../components/code-block";
// import EmptyScreen from "../../components/empty-screen"
// const Chat = ({ id, className, session }) => {
//   const dispatch = useDispatch();
//   const chatHistory = useSelector((state) => state.auth.user?.userHistory || []);
//   const check = useSelector((state) => state.auth );
//   const isLoading = useSelector((state) => state.auth.loading); // Get loading state from Redux store
//   console.log(check,"check")
//   const [input, setInput] = useState("");
//   const [responseStream, setResponseStream] = useState([]);
//   const [sendingMessage, setSendingMessage] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [shouldStop, setShouldStop] = useState(false);

//   const animationRef = useRef(null);

//   useEffect(() => {
//     console.log(chatHistory,"chatHistory")
//   },[chatHistory])

//   useEffect(() => {
//     posthog.capture('$pageview');
//   }, []);

//   // useEffect(() => {
//   //   const email = localStorage.getItem('email');
//   //   if (email) {
//   //     dispatch(fetchHistory(email));
//   //   }
//   // }, [dispatch]);

//   useEffect(() => {
//     if (selectedChat !== null) {
//       const selectedChatData = chatHistory[selectedChat];
//       if (selectedChatData) {
//         setResponseStream([selectedChatData.response_txt || ""]);
//       }
//     }
//   }, [selectedChat, chatHistory]);

//   const fetchResponse = async (sanitizedInput) => {
//     try {
//       setSendingMessage(true);
//       setShouldStop(false);

//       posthog.capture('message_sent', {
//         user: session?.user?.email,
//         message: sanitizedInput,
//       });

//       const apiUrl = `https://junaid121e2e-001-site1.ctempurl.com/api/ResponseGeneration/TextResponseGenerator`;

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: "string",
//           response_txt: "string",
//           request_txt: sanitizedInput,
//           email: session?.user?.email,
//           base64Image: "string",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const reader = response.body
//         ?.pipeThrough(new TextDecoderStream())
//         .getReader();

//       if (!reader) return;

//       let streamData = "";
//       const words = [];
//       let currentIndex = 0;

//       const renderWords = (timestamp) => {
//         if (shouldStop) {
//           setSendingMessage(false);
//           cancelAnimationFrame(animationRef.current);
//           return;
//         }

//         if (currentIndex < words.length) {
//           setResponseStream((prevStream) => [
//             ...prevStream,
//             words[currentIndex] + " ",
//           ]);
//           currentIndex++;
//         } else {
//           setSendingMessage(false);
//           cancelAnimationFrame(animationRef.current);
//           return;
//         }

//         animationRef.current = requestAnimationFrame(renderWords);
//       };

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         streamData += value;
//         words.push(...value.split(" "));
//       }

//       animationRef.current = requestAnimationFrame(renderWords);
    
//       posthog.capture('chat_history_loaded', {
//         user: session?.user?.email,
//         historyLength: chatHistory.length,
//       });

//       const newChatIndex = chatHistory.length;
//       setSelectedChat(newChatIndex);
//       handleSelectChat(newChatIndex);
  
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setSendingMessage(false);
//       cancelAnimationFrame(animationRef.current);
//     }
//   };

//   const handleStop = () => {
//     setShouldStop(true);
//   };

//   const handleSend = async () => {
//     if (input.trim() === "") {
//       toast.error("Input cannot be empty.");
//       return;
//     }

//     const sanitizedInput = input.trim();
//     setInput("");
//     setResponseStream([]);

//     await fetchResponse(sanitizedInput);
//   };

//   const handleSelectChat = (index) => {
//     setSelectedChat(index);
//   };

//   return (
   
//     <>
//     <Header/>
//     <div
//     style={{
//       height: 'calc(100vh - 60px)',
//     }}
//     className=" w-full flex justify-between overflow-hidden">
//  <Sidebar
//           chatHistory={chatHistory}
          
//           selectedChatIndex={selectedChat}
//           onSelectChat={handleSelectChat}
//           isLoading={isLoading}
//         />

//   <Box
//     sx={{
//       flexGrow: 1,
//       p: 2,
//       display: 'flex',
//       flexDirection: 'column',
//       position: 'relative',
//       height: 'calc(100vh - 60px)',
//       overflowY: 'scroll', 
//       overflowX:"hidden"
//     }}
//   >
//     {responseStream.length > 0 ? (
//      <div className="no-scrollbar">
//      <CodeBlock code={responseStream.join('')} />
//     </div>
   
//     ) : (
//       <EmptyScreen />
//     )}

//     {/* <ChatPanel
//       id={id}
//       input={input}
//       setInput={setInput}
//       handleSend={handleSend}
//       sendingMessage={sendingMessage}
//       handleStopStreaming={() => setSendingMessage(false)}
//       streaming={sendingMessage}
//     /> */}
//        <ChatPanel
//           input={input}
//           onInputChange={setInput}
//           onSend={handleSend}
//           sendingMessage={sendingMessage}
//           responseStream={responseStream}
//           handleStop={handleStop}
//           setInput={setInput}
//         />
//   </Box>
// </div>
//     </>




//   );
// };

// export default Chat;


import React, { useState, useRef, useEffect } from "react";
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
 import { fetchHistory,setUserHistory } from "../../store/authSlice";

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
  const [shouldStop, setShouldStop] = useState(false);
  const animationRef = useRef(null);


  useEffect(() => {
    console.log("userState", userState);

  }, [chatHistory, isLoading]);

  // useEffect(() => {
  //   console.log(userState?.email,"user?.email")
  //   if (userState?.email) {
  //     fetchHistory(userState.email);
  //   }
  // }, [userState, dispatch]);

  // useEffect(() => {
  //   posthog.capture('$pageview');
  //   const loadHistory = async () => {
  //     try {
  //       const email = userState.user?.email;
  //       console.log(email,"email")
  //       if (email) {
  //         const historyData = await fetchHistory(email);
  //         console.log(historyData,"historyData")
  //         dispatch({ type: 'SET_HISTORY', payload: historyData });
  //       }
  //     } catch (error) {
  //       toast.error("Failed to load chat history.");
  //     }
  //   };

  //   loadHistory();
  // }, [dispatch, userState.user?.email]);
  useEffect(() => {
    posthog.capture('$pageview');
   
  }, []);

  useEffect(() => {
    if (selectedChat !== null) {
      const selectedChatData = chatHistory[selectedChat];
      if (selectedChatData) {
        setResponseStream([selectedChatData.response_txt || ""]);
      }
    }
  }, [selectedChat, chatHistory]);

  const fetchResponse = async (sanitizedInput) => {
    try {
      setSendingMessage(true);
      setShouldStop(false);

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
          prompt:""
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();

      if (!reader) return;

      let streamData = "";
      const words = [];
      let currentIndex = 0;

      const renderWords = (timestamp) => {
        if (shouldStop) {
          setSendingMessage(false);
          cancelAnimationFrame(animationRef.current);
          return;
        }

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

    
        // Fetch the updated chat history
        await dispatch(fetchHistory(userState?.email));
        dispatch(setUserHistory(chatHistory));
    
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
  };

  const handleStop = () => {
    setShouldStop(true);
  };

  const handleSend = async () => {
    if (input.trim() === "") {
      toast.error("Input cannot be empty.");
      return;
    }

    const sanitizedInput = input.trim();
    setInput("");
    setResponseStream([]);

    await fetchResponse(sanitizedInput);
  };
 

  

  const handleSelectChat = (index) => {
    setSelectedChat(index);
  };

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
          isLoading={isLoading}
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
            onInputChange={setInput}
            handleSend={handleSend}
            sendingMessage={sendingMessage}
            responseStream={responseStream}
            handleStop={handleStop}
            setInput={setInput}
          />
        </Box>
      </div>
    </>
  );
};

export default PrivateRoute(Chat);
