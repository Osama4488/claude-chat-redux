import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Container, Box } from "@mui/material";
import ChatPanel from "../../components/chat-panel";
import Header from "../../layout/header";
import Sidebar from "../../components/chat-sidebar";
import parse from "html-react-parser";
import PrivateRoute from "../../components/private-route";
import { useAuth } from "../../context/AuthContext";
import CodeBlock from "../../components/code-block";
function Chat({ id, className, session, missingKeys }) {
  const router = useRouter();
  const path = usePathname();
  const { state } = useAuth();

  const [input, setInput] = useState("");
  const [responseStream, setResponseStream] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [shouldStop, setShouldStop] = useState(false);

  const chatHistory = [{ summary: "write a blog on coding" }];
  const animationRef = useRef(null);

  useEffect(() => {
    console.log("ppp", state);
  }, [state, state.user]);

  const fetchResponse = async () => {
    try {
      setSendingMessage(true); // Start loader
      setShouldStop(false); // Reset stop flag
      const apiUrl = `https://junaid121e2e-001-site1.ctempurl.com/api/ResponseGeneration/TextResponseGenerator`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "string",
          response_txt: "string",
          request_txt: input,
          email: "syed.osama.ali.96@gmail.com",
          base64Image: "string",

          // str: input
        }),
      });

      console.log(response, "response");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      let streamData = "";
      let currentIndex = 0;
      let lastTimestamp = 0;
      const delay = 50; // Milliseconds between each word

      const renderWords = (timestamp) => {
        if (shouldStop) {
          console.log("inside shouldStop");
          setSendingMessage(false);
          cancelAnimationFrame(animationRef.current);
          return;
        }

        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;

        if (elapsed > delay) {
          if (currentIndex < words.length) {
            setResponseStream((prevStream) => [
              ...prevStream,
              words[currentIndex] + " ",
            ]);
            currentIndex++;
            lastTimestamp = timestamp;
          } else {
            setSendingMessage(false);
            cancelAnimationFrame(animationRef.current);
            return;
          }
        }
        animationRef.current = requestAnimationFrame(renderWords);
      };

      // Reading the response body and then processing it
      const words = [];
      while (true) {
        const { value, done } = await reader.read();

        if (done) break;
        streamData += value;
      }

      console.log(streamData, "streamData");

      words.push(...streamData.split(" "));

      animationRef.current = requestAnimationFrame(renderWords);
    } catch (error) {
      console.error("Error fetching response:", error);
      setSendingMessage(false);
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleStop = () => {
    console.log("handle stop clicked");
    setShouldStop(true); 
  };

  const handleSend = () => {
    setResponseStream([]);
    fetchResponse();
    setInput("");
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar chatHistory={state.user?.userHistory} onSelectChat={handleSelectChat} />{" "}
        {/* Add Sidebar */}
        {/* <Box sx={{ flexGrow: 1, p: 2 }}>
          <div className="h-full flex flex-col justify-between mt-6">
            {responseStream.length > 0 ? (
              <div className="max-w-[900px] mx-auto text-left break-word">
                {parse(responseStream.join(""))}
              </div>
            ) : (
              <EmptyScreen />
            )}
            <ChatPanel
              id={id}
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              sendingMessage={sendingMessage}
              handleStopStreaming={handleStop}
              streaming={sendingMessage}
            />
          </div>
        </Box> */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
  <div className="h-full flex flex-col justify-between mt-6">
    {responseStream.length > 0 ? (
      <div className="max-w-[900px] mx-auto text-left break-word">
        <CodeBlock code={responseStream.join("")} />
      </div>
    ) : (
      <EmptyScreen />
    )}
    <ChatPanel
      id={id}
      input={input}
      setInput={setInput}
      handleSend={handleSend}
      sendingMessage={sendingMessage}
      handleStopStreaming={handleStop}
      streaming={sendingMessage}
    />
  </div>
</Box>


      </Box>
    </>
  );
}

function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Next.js AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with{" "}
          <a href="https://nextjs.org">Next.js</a>, the{" "}
          <a href="https://sdk.vercel.ai">Vercel AI SDK</a>, and{" "}
          <a href="https://vercel.com/storage/kv">Vercel KV</a>.
        </p>
        <p className="leading-normal text-muted-foreground">
          It uses{" "}
          <a href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </a>{" "}
          to combine text with generative UI as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
        </p>
      </div>
    </div>
  );
}

export default Chat;
