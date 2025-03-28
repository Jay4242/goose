import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="close-button" onClick={toggleSidebar}>
        &times;
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className="sidebar-link" activeClassName="sidebar-link-active">
              Chat
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="sidebar-link" activeClassName="sidebar-link-active">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
