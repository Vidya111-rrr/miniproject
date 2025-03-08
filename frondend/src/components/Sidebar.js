import React, { useState } from 'react';
import { House, UserPlus, LogOut, LogIn, RefreshCcw } from 'lucide-react'; // Importing icons from lucide-react
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Close' : 'Open'} Sidebar
        </button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="/home">
            <House size={24} />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/wastecollectionform">
            <RefreshCcw size={24} />
            <span>Waste Collection Form</span>
          </a>
        </li>
        <li>
          <a href="/store">
            <LogIn size={24} />
            <span>Store</span>
          </a>
        </li>
        <li>
          <a href="/recyclingservicesform">
            <UserPlus size={24} />
            <span>Recycling Services</span>
          </a>
        </li>
        <li>
          <a href="/settings">
            <LogOut size={24} />
            <span>Settings</span>
          </a>
        </li>
        <li>
          <a href="/aboutus">
            <LogOut size={24} />
            <span>About Us</span>
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleLogout}>
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
