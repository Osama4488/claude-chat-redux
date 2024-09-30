// // chatWorker.js
 
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// self.onmessage = async (event) => {
//   const { type, payload } = event.data;
 
//   switch (type) {
//     case 'fetchResponse':
//       const response = await fetchResponse(payload.sanitizedInput, payload.email);
//       const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
//       if (!reader) return;
 
//       let streamData = "";
//       const words = [];
 
//       // Read the stream
//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break; // Exit loop when done
//         streamData += value;
//         words.push(...value.split(" "));
 
//         // Send each word with a delay
//         for (const word of words) {
//           self.postMessage({ type: 'responseStream', payload: [word] });
//           await delay(40); // Delay of 500ms between words
//         }
//       }
 
//       break;
 
//     default:
//       console.error("Unknown message type:", type);
//       break;
//   }
// };
 
// const fetchResponse = async (sanitizedInput, email) => {
//   const apiUrl = `https://shabahat-001-site1.etempurl.com/api/ResponseGeneration/TextResponseGenerator`;
//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: "",
//       response_txt: "",
//       request_txt: sanitizedInput,
//       email: email,
//       base64Image: "",
//       prompt: ""
//     }),
//   });
 
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
 
//   return response;
// };
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

self.onmessage = async (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'fetchResponse':
      const response = await fetchResponse(payload.sanitizedInput, payload.email);
      const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
      if (!reader) return;

      let streamData = "";
      const words = [];

      // Notify the main app to fetch and set history at the start of streaming
      self.postMessage({ type: 'fetchHistory', payload: payload.email });

      // Read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break; // Exit loop when done
        streamData += value;
        words.push(...value.split(" "));

        // Send each word with a delay
        for (const word of words) {
          self.postMessage({ type: 'responseStream', payload: [word] });
          await delay(40); // Delay of 40ms between words

          // Notify the main app periodically to fetch and set history
          self.postMessage({ type: 'fetchHistory', payload: payload.email });
        }
      }

      // After stream ends, notify the app one last time to fetch the chat history
      self.postMessage({ type: 'fetchHistory', payload: payload.email });
      break;

    default:
      console.error("Unknown message type:", type);
      break;
  }
};

const fetchResponse = async (sanitizedInput, email) => {
  const apiUrl = `https://shabahat-001-site1.etempurl.com/api/ResponseGeneration/TextResponseGenerator`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "",
      response_txt: "",
      request_txt: sanitizedInput,
      email: email,
      base64Image: "",
      prompt: ""
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};
