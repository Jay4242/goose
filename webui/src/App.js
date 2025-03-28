import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import SettingsView from './components/SettingsView';
import AgentInitializer from './components/AgentInitializer'; // Import AgentInitializer
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAgentInitialized, setIsAgentInitialized] = useState(false); // Track agent initialization status

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Callback function to set agent initialization status
  const handleAgentInitialized = () => {
    setIsAgentInitialized(true);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? 'content-shifted' : ''}`}>
          <Header toggleSidebar={toggleSidebar} />
          {/* Render AgentInitializer and pass the callback */}
          <AgentInitializer onAgentInitialized={handleAgentInitialized} />
          <Routes>
            <Route path="/" element={<ChatView isAgentInitialized={isAgentInitialized} />} /> {/* Pass the status to ChatView */}
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
