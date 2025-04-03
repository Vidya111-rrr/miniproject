import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  if (!isOpen) return null; // Only render if the sidebar is open

  return (
    <div
      className="sidebar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '250px',
        height: '100%',
        background: '#333',
        color: '#fff',
        padding: '20px',
        zIndex: 1000,
        transition: '0.3s',
      }}
    >
      <button
        onClick={closeSidebar}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        ×
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
        </li>
        <li>
          <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link>
        </li>
        <li>
          <Link to="/AdminPage" style={{ color: '#fff', textDecoration: 'none' }}>Admin</Link>
        </li>
        <li>
          <Link to="/signin" style={{ color: '#fff', textDecoration: 'none' }}>Sign In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;