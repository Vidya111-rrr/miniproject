import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import Sidebar component
import './Header.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage the sidebar state
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (URL path)

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  // Get the user's role from localStorage and log it for debugging
  const userRole = localStorage.getItem('role');
  console.log('Current User Role from localStorage:', userRole); // Debug the role

  const handleLogout = () => {
    // Remove the token and role, then redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Determine if a link is active (to underline it)
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header" style={{ padding: '15px 30px', height: '80px' }}>
      <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* Sidebar Button */}
          <button
            className="sidebar-button"
            style={{ marginRight: '15px', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle the sidebar open/close
          >
            ☰
          </button>
          
          {/* Logo and Name */}
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/images/logo.jpg" alt="EcoSync Logo" className="logo" style={{ marginRight: '10px', height: '50px' }} />
            <h1 style={{ fontSize: '24px' }}>EcoSync</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="nav-list" style={{ display: 'flex', gap: '20px' }}>
            {/* Always show Home link */}
            <li>
              <a
                href="/"
                aria-label="Home"
                className={isActive('/') ? 'nav-label active' : 'nav-label'}
              >
                Home
              </a>
            </li>

            {/* Always show About link */}
            <li>
              <a
                href="/about"
                aria-label="About"
                className={isActive('/about') ? 'nav-label active' : 'nav-label'}
              >
                About
              </a>
            </li>

            {/* Links when not logged in */}
            {!isLoggedIn ? (
              <>
                <li>
                  <a
                    href="/login"
                    aria-label="Login"
                    className={isActive('/login') ? 'nav-label active' : 'nav-label'}
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    aria-label="Register"
                    className={isActive('/register') ? 'nav-label active' : 'nav-label'}
                  >
                    Register
                  </a>
                </li>
              </>
            ) : (
              <>
                {/* Conditional rendering based on user role */}
                {userRole === 'admin' ? (
                  <>
                    {/* Admin-specific navigation */}
                    <li>
                      <a
                        href="/settings"
                        aria-label="Settings"
                        className={isActive('/settings') ? 'nav-label active' : 'nav-label'}
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/AdminPage"
                        aria-label="Admin"
                        className={isActive('/AdminPage') ? 'nav-label active' : 'nav-label'}
                      >
                        Admin
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        aria-label="Logout"
                        className={isActive('/logout') ? 'nav-label active' : 'nav-label'}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    {/* Non-admin navigation */}
                    <li>
                      <a
                        href="/bids"
                        aria-label="Bids"
                        className={isActive('/bids') ? 'nav-label active' : 'nav-label'}
                      >
                        Bids
                      </a>
                    </li>
                    <li>
                      <a
                        href="/WasteCollectionForm"
                        aria-label="Form"
                        className={isActive('/WasteCollectionForm') ? 'nav-label active' : 'nav-label'}
                      >
                        Form
                      </a>
                    </li>
                    <li>
                      <a
                        href="/settings"
                        aria-label="Settings"
                        className={isActive('/settings') ? 'nav-label active' : 'nav-label'}
                      >
                        Settings
                      </a>
                    </li>
                    {userRole === 'wastecollector' && (
                      <li>
                        <a
                          href="/recyclingservicesform"
                          aria-label="Recycling Services"
                          className={isActive('/recyclingservicesform') ? 'nav-label active' : 'nav-label'}
                        >
                          Recycling Services
                        </a>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        aria-label="Logout"
                        className={isActive('/logout') ? 'nav-label active' : 'nav-label'}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;