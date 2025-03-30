import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (URL path)

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  // Get the user's role from localStorage
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    // Remove the token and role, then redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Determine if a link is active (to underline it)
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <h1>EcoSync</h1>
        <nav>
          <ul className="nav-list">
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
                {/* Links when logged in */}
                {/* Common links for both roles */}
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

                {/* Role-specific links */}
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

                {/* Logout link */}
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;