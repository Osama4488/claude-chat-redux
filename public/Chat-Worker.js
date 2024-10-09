// chatWorker.js
 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

self.onmessage = async (event) => {
  const { type, payload } = event.data;
 
  switch (type) {
    case 'fetchResponse':
      const response = await fetchResponse(payload.sanitizedInput, payload.email,payload.token);
      const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();
      if (!reader) return;
 
      let streamData = "";
      const words = [];
 
      // Read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break; // Exit loop when done
        streamData += value;
        words.push(...value.split(" "));
 
        // Send each word with a delay
        for (const word of words) {
          self.postMessage({ type: 'responseStream', payload: [word] });
          await delay(40); // Delay of 500ms between words
        }
      }
       // Notify the main thread that the response is fully streamed and complete
       self.postMessage({ type: 'streamComplete' });
 
      break;
 
    default:
      console.error("Unknown message type:", type);
      break;
  }
};
 
const fetchResponse = async (sanitizedInput, email,token) => {
  const apiUrl = `https://shabahat-001-site1.etempurl.com/api/ResponseGeneration/TextResponseGenerator`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, 
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