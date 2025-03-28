import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { sendMessage } from '../api'; // Import the sendMessage function

function ChatView({ isAgentInitialized }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const handleNewMessage = (text) => {
    const botMessage = { text: text, sender: 'goose' };
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        sendMessage([...messages, userMessage], handleNewMessage); // Pass the entire message history
      } catch (error) {
        console.error("Failed to get response:", error);
        // Handle error (e.g., display an error message in the chat)
        const errorBotMessage = { text: "Sorry, I couldn't process your request.", sender: 'goose' };
        setMessages(prevMessages => [...prevMessages, errorBotMessage]);
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-view">
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isAgentInitialized) {
              handleSendMessage();
            }
          }}
          disabled={!isAgentInitialized} // Disable input if agent is not initialized
        />
        <button onClick={handleSendMessage} disabled={!isAgentInitialized}>Send</button>
      </div>
    </div>
  );
}

export default ChatView;
