import React from 'react';
import { House, UserPlus, LogOut, LogIn, Info, Recycle, FileText, File } from 'lucide-react'; // Added more icons
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

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

  return (
    <header className="header">
      <div className="header-content">
        <h1>EcoSync</h1>
        <nav>
          <ul className="nav-list">
            {/* Always show Home link */}
            <li>
              <a href="/" aria-label="Home">
                <House size={24} />
                <span id="homelabel" className="nav-label">Home</span>
              </a>
            </li>

            {/* Always show About link */}
            <li>
              <a href="/about" aria-label="About">
                <Info size={24} />
                <span className="nav-label">About</span>
              </a>
            </li>

            {/* Links when not logged in */}
            {!isLoggedIn ? (
              <>
                <li>
                  <a href="/login" aria-label="Login">
                    <LogIn size={24} />
                    <span className="nav-label">Login</span>
                  </a>
                </li>
                <li>
                  <a href="/register" aria-label="Register">
                    <UserPlus size={24} />
                    <span className="nav-label">Register</span>
                  </a>
                </li>
              </>
            ) : (
              <>
                {/* Links when logged in */}
                {/* Show Recycling Services link only for waste collectors */}
                {userRole === 'wastecollector' && (
                  <li>
                    <a href="/recyclingservicesform" aria-label="Recycling Services">
                      <Recycle size={24} />
                      <span className="nav-label">Recycling Services</span>
                    </a>
                  </li>
                )}

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