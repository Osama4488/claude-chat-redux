
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Container, Box } from "@mui/material";
import ChatPanel from "../../components/chat-panel";
import Header from "../../layout/header";

export default function Chat({ id, className, session, missingKeys }) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  const [responseStream, setResponseStream] = useState([]); // State to store streamed responses
  const [sendingMessage, setSendingMessage] = useState(false); // State for sending message loader

  const fetchResponse = async () => {
    try {
      setSendingMessage(true); // Start loader
      const apiUrl = `https://junaid121e2e-001-site1.ctempurl.com/api/ResponseGeneration/StreamTextResponseGenerator?str=${encodeURIComponent(
        input
      )}`;
      const response = await axios.get(apiUrl);
      console.log(response,"response")
      setResponseStream(prevStream => [...prevStream, response.data.results]); // Append new response to stream
    } catch (error) {
      console.error("Error fetching response:", error);
      // Handle error state if needed
    } finally {
      setSendingMessage(false); // Stop loader
    }
  };

  const handleSend = () => {
    // Call API to fetch response when sending a message
    fetchResponse();
    setInput(""); // Clear input after sending
  };

  return (
    <>
      <Header />
      <Container className="group w-full overflow-auto ">
        <Box
          sx={{
            pb: "200px",
            pt: { xs: 4, md: 10 },
            ...(className ? { className } : {}),
          }}
          className="flex flex-col justify-between"
        >
          {responseStream.length > 0 ? (
            responseStream.map((response, index) => (
              <div key={index}>{response}</div>
            ))
          ) : (
            <EmptyScreen />
          )}
          <Box sx={{ width: "100%", height: "1px" }} />

          <ChatPanel
            id={id}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            sendingMessage={sendingMessage} // Pass sendingMessage state to ChatPanel
          />

        </Box>
      </Container>
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
