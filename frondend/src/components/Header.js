import React from 'react';
<<<<<<< HEAD
import { useNavigate, useLocation } from 'react-router-dom';
=======
import { House, UserPlus, LogOut, LogIn, Info, Recycle, FileText, File } from 'lucide-react'; // Added more icons
>>>>>>> 4086b01f8979071d1fbe12595a07e5a006a69714
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation(); // Get the current location (URL path)
=======
>>>>>>> 4086b01f8979071d1fbe12595a07e5a006a69714

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

<<<<<<< HEAD
  // Determine if a link is active (to underline it)
  const isActive = (path) => location.pathname === path;

=======
>>>>>>> 4086b01f8979071d1fbe12595a07e5a006a69714
  return (
    <header className="header">
      <div className="header-content">
        <h1>EcoSync</h1>
        <nav>
          <ul className="nav-list">
            {/* Always show Home link */}
            <li>
<<<<<<< HEAD
              <a
                href="/"
                aria-label="Home"
                className={isActive('/') ? 'nav-label active' : 'nav-label'}
              >
                Home
=======
              <a href="/" aria-label="Home">
                <House size={24} />
                <span id="homelabel" className="nav-label">Home</span>
>>>>>>> 4086b01f8979071d1fbe12595a07e5a006a69714
              </a>
            </li>

            {/* Always show About link */}
            <li>
<<<<<<< HEAD
              <a
                href="/about"
                aria-label="About"
                className={isActive('/about') ? 'nav-label active' : 'nav-label'}
              >
                About
=======
              <a href="/about" aria-label="About">
                <Info size={24} />
                <span className="nav-label">About</span>
>>>>>>> 4086b01f8979071d1fbe12595a07e5a006a69714
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
<<<<<<< HEAD
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
=======
                {/* Show Recycling Services link only for waste collectors */}
                {userRole === 'wastecollector' && (
                  <li>
                    <a href="/recyclingservicesform" aria-label="Recycling Services">
                      <Recycle size={24} />
                      <span className="nav-label">Recycling Services</span>
>>>>>>> 4086b01f8979071d1fbe12595a07e5a006a69714
                    </a>
                  </li>
                )}

<<<<<<< HEAD
                {/* Logout link */}
                <li>
                  <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    className={isActive('/logout') ? 'nav-label active' : 'nav-label'}
                  >
                    Logout
=======
                {/* Bids link */}
                <li>
                  <a href="/bids" aria-label="Bids">
                    <FileText size={24} />
                    <span className="nav-label">Bids</span>
                  </a>
                </li>

                {/* Form link */}
                <li>
                  <a href="/WasteCollectionForm" aria-label="Form">
                    <File size={24} />
                    <span className="nav-label">Form</span>
                  </a>
                </li>

                {/* Logout link */}
                <li>
                  <button onClick={handleLogout} aria-label="Logout">
                    <LogOut size={24} />
                    <span className="nav-label">Logout</span>
>>>>>>> 4086b01f8979071d1fbe12595a07e5a006a69714
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