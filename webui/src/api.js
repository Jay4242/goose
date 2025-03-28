const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual API URL
const SECRET_KEY = 'test'; // Replace with your actual secret key

// Helper to construct API endpoints
const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const initializeAgent = async (provider, model) => {
  try {
    const response = await fetch(getApiUrl('/agent'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Secret-Key': SECRET_KEY,
      },
      body: JSON.stringify({ provider: provider, model: model }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Could not initialize agent:', error);
    throw error;
  }
};


export const sendMessage = async (messages, onMessage) => {
  const userMessage = messages[messages.length - 1];
  try {
    const response = await fetch(getApiUrl('/reply'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Secret-Key': SECRET_KEY,
      },
      body: JSON.stringify({ 
        messages: messages.map(msg => ({
          role: msg.sender === 'goose' ? 'assistant' : msg.sender,
          content: [{ type: 'text', text: msg.text }],
          created: Date.now()
        })), 
        session_id: null, 
        session_working_dir: "" 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const textDecoder = new TextDecoder();
    let partialResult = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      partialResult += textDecoder.decode(value);

      // Process each SSE event
      let eventStart = 0;
      while (eventStart < partialResult.length) {
        const dataPrefix = "data: ";
        const dataStart = partialResult.indexOf(dataPrefix, eventStart);

        if (dataStart === -1) {
          break; // No more complete events
        }

        const newlineIndex = partialResult.indexOf('\n\n', dataStart);
        if (newlineIndex === -1) {
          break; // Incomplete event, wait for more data
        }

        const eventData = partialResult.substring(dataStart + dataPrefix.length, newlineIndex).trim();
        eventStart = newlineIndex + 2; // Move to the next potential event

        try {
          const parsed = JSON.parse(eventData);
          if (parsed.type === "Message") {
            onMessage(parsed.message.content[0].text); // Call the callback with the message
          } else if (parsed.type === "Error") {
            throw new Error(parsed.error);
          } else if (parsed.type === "Finish") {
            console.log("Stream finished:", parsed.reason);
          }
        } catch (e) {
          console.error("Error parsing JSON:", e, "Raw data:", eventData);
          throw e;
        }
      }
      partialResult = partialResult.substring(eventStart); // Store any remaining data
    }
  } catch (error) {
    console.error('Could not send message:', error);
    throw error;
  }
};
