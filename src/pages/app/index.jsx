"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { toast } from "sonner";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import ChatPanel from "../../components/chat-panel";
import Link from "next/link";
import Header from "../../layout/header";

export default function Chat({ id, className, session, missingKeys }) {
  const router = useRouter();
  const path = usePathname();
  const [input, setInput] = useState("");
  //   const [_, setNewChatId] = useLocalStorage("newChatId", id);

  //   useEffect(() => {
  //     setNewChatId(id);
  //   });

  //   useEffect(() => {
  //     missingKeys.map((key) => {
  //       toast.error(`Missing ${key} environment variable!`);
  //     });
  //   }, [missingKeys]);

  return (
    <>
      <Header />
      <Container
        //   maxWidth="lg"
        className="group w-full overflow-auto flex justify-center"
      >
        <Box
          sx={{
            pb: "200px",
            pt: { xs: 4, md: 10 },
            ...(className ? { className } : {}),
          }}
        >
          <EmptyScreen />
          <Box sx={{ width: "100%", height: "1px" }} />
        </Box>
        <ChatPanel id={id} input={input} setInput={setInput} />
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
          <Link href="https://nextjs.org">Next.js</Link>, the{" "}
          <Link href="https://sdk.vercel.ai">Vercel AI SDK</Link>, and{" "}
          <Link href="https://vercel.com/storage/kv">Vercel KV</Link>.
        </p>
        <p className="leading-normal text-muted-foreground">
          It uses{" "}
          <Link href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </Link>{" "}
          to combine text with generative UI as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
        </p>
      </div>
    </div>
  );
}

// function ChatPanel({ id, input, setInput, isAtBottom, scrollToBottom }) {
//   const handleInputChange = (e) => setInput(e.target.value);
//   const handleSend = () => {
//     // Placeholder for send functionality
//     console.log("Sending message:", input);
//     setInput("");
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         bottom: 0,
//         // width: "100%",
//         width: "1200px",
//         marginBottom: "20px",
//         bgcolor: "background.paper",
//         p: 2,
//         boxShadow: 3,
//       }}
//     >
//       <TextField
//         fullWidth
//         value={input}
//         onChange={handleInputChange}
//         placeholder="Type your message..."
//         variant="outlined"
//         InputProps={{
//           endAdornment: (
//             <Button variant="contained" color="primary" onClick={handleSend}>
//               Send
//             </Button>
//           ),
//         }}
//       />
//       {/* {isAtBottom ? null : (
//         <Button variant="outlined" onClick={scrollToBottom} sx={{ mt: 2 }}>
//           Scroll to Bottom
//         </Button>
//       )} */}
//     </Box>
//   );
// }
