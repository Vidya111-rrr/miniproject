import React from 'react';
import { House, UserPlus, LogOut, LogIn } from 'lucide-react'; // Import correct Lucid Icons
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token and redirect to login
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <header className="header">
      <div className="header-content">
        <h1>EcoSync</h1>
        <nav>
          <ul className="nav-list">
            <li>
              <a href="/" aria-label="Home">
                <House size={24} />
                <span id ="homelabel" className="nav-label">Home</span>
              </a>
            </li>

            {/* Show Login/Register when not logged in */}
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
              // Show Logout when logged in
              <li>
                <button onClick={handleLogout} aria-label="Logout">
                  <LogOut size={24} />
                  <span className="nav-label">Logout</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
