import React from 'react';
import logo from './goose.png'; // Import the logo image

function Header({ toggleSidebar }) {
  return (
    <header className="app-header">
      <button onClick={toggleSidebar}>☰</button>
      <img src={logo} alt="Goose Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
      <h1>Goose Web UI</h1>
    </header>
  );
}

export default Header;
