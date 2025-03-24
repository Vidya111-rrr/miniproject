import React, { useRef, useEffect, useState } from "react";
import { Home, Info, Mail, LogOut, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (typeof setIsOpen !== "function") {
      console.error("setIsOpen is not a function. Make sure you pass it as a prop.");
      return;
    }

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleSignup = () => {
    localStorage.setItem("token", "user_token"); // Simulating signup by setting a token
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md transition-transform duration-300 p-5 flex flex-col z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <img src="/images/logo.jpg" alt="EcoSync Logo" className="w-10 h-10 rounded-full" />
        <h2 className="text-lg font-semibold">EcoSync</h2>
      </div>
      <ul className="space-y-4">
        <li>
          <a href="/" className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-200">
            <Home size={24} />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/about" className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-200">
            <Info size={24} />
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="/contact" className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-200">
            <Mail size={24} />
            <span>Contact</span>
          </a>
        </li>
        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-200 w-full text-left"
            >
              <LogOut size={24} />
              <span>Logout</span>
            </button>
          </li>
        ) : (
          <li>
            <button
              onClick={handleSignup}
              className="flex items-center gap-3 text-gray-700 p-2 rounded-lg hover:bg-gray-200 w-full text-left"
            >
              <UserPlus size={24} />
              <span>Signup</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;