import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Header.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const renderCommonLinks = () => (
    <>
      <li>
        <a href="/" className={isActive('/') ? 'nav-label active' : 'nav-label'}>Home</a>
      </li>
      <li>
        <a href="/about" className={isActive('/about') ? 'nav-label active' : 'nav-label'}>About</a>
      </li>
      <li>
        <a href="/settings" className={isActive('/settings') ? 'nav-label active' : 'nav-label'}>Settings</a>
      </li>
      <li>
        <button onClick={handleLogout} className="nav-label">Logout</button>
      </li>
    </>
  );

  return (
    <header className="header" style={{ padding: '15px 30px', height: '80px' }}>
      <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <button
            className="sidebar-button"
            style={{ marginRight: '15px', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/images/logo.jpg" alt="EcoSync Logo" className="logo" style={{ height: '50px' }} />
            <h1 style={{ fontSize: '24px' }}>EcoSync</h1>
          </div>
        </div>

        <nav>
          <ul className="nav-list" style={{ display: 'flex', gap: '20px' }}>
            {!isLoggedIn ? (
              <>
                <li>
                  <a href="/login" className={isActive('/login') ? 'nav-label active' : 'nav-label'}>Login</a>
                </li>
                <li>
                  <a href="/register" className={isActive('/register') ? 'nav-label active' : 'nav-label'}>Register</a>
                </li>
              </>
            ) : (
              <>
                {/* Role-specific links */}
                {userRole === 'admin' && (
                  <li>
                    <a href="/Admin" className={isActive('/Admin') ? 'nav-label active' : 'nav-label'}>Users</a>
                  </li>
                )}
                {userRole === 'generator' && (
                  <>
                    <li>
                      <a href="/bids" className={isActive('/bids') ? 'nav-label active' : 'nav-label'}>Bids</a>
                    </li>
                    <li>
                      <a href="/WasteCollectionForm" className={isActive('/WasteCollectionForm') ? 'nav-label active' : 'nav-label'}>Waste Generation</a>
                    </li>
                  </>
                )}
                {userRole === 'wastecollector' && (
                  <li>
                    <a href="/recyclingservicesform" className={isActive('/recyclingservicesform') ? 'nav-label active' : 'nav-label'}>Recycling Services</a>
                  </li>
                )}

                {/* Common to all roles */}
                {renderCommonLinks()}
              </>
            )}
          </ul>
        </nav>
      </div>

      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;
