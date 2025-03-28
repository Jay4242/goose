import React, { useState, useEffect } from 'react';
import { initializeAgent } from '../api';

function AgentInitializer({ onAgentInitialized }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Replace with your actual provider and model selection logic
        const provider = 'google';
        const model = 'gemini-2.0-flash';
        await initializeAgent(provider, model);
        onAgentInitialized(); // Notify parent component that agent is initialized
      } catch (err) {
        setError(err.message || 'Failed to initialize agent.');
        console.error("Agent initialization failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [onAgentInitialized]);

  if (isLoading) {
    return <div>Initializing agent...</div>;
  }

  if (error) {
    return <div>Error initializing agent: {error}</div>;
  }

  return null; // Render nothing if initialization is successful
}

export default AgentInitializer;
