import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Forgot Password Change
  const handleForgotPasswordChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  // Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to login endpoint
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email, // Using email as username as per the form
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in local storage
        localStorage.setItem("token", data.token);

        // Navigate based on user role
        const role = data.role;
        if (role === "generator") {
          navigate("/WasteCollectionForm");
        } else if (role === "wastecollector") {
          navigate("/recyclingservicesform");
        } else if (role === "admin") {
          navigate("/Admin");
        } else {
          alert("Unknown role. Please contact support.");
        }
      } else {
        // Handle errors (e.g., invalid credentials)
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  };

  // Handle Forgot Password Submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotPasswordMessage("Password reset link sent to your email.");
      } else {
        setForgotPasswordMessage(data.message || "Failed to send password reset link.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setForgotPasswordMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-green-600 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold">EcoSync</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline text-sm md:text-base">Home</Link>
            <Link to="/login" className="hover:underline text-sm md:text-base">Login</Link>
            <Link to="/register" className="hover:underline text-sm md:text-base">Register</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center mt-16 p-4 md:p-8">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-600">Login to EcoSync</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email or Username
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email or username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                required
                onChange={handleChange}
                value={formData.password}
              />
              <span
                className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-green-600"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </span>
            </div>

            {/* Additional Options */}
            <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">Remember Me</span>
              </label>
              <Link to="#" className="text-green-600 hover:underline" onClick={() => document.getElementById('forgotPasswordModal').style.display = 'block'}>
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold"
            >
              Log In
            </button>

            {/* Login with OTP */}
            <button
              type="button"
              className="w-full border border-green-600 text-green-600 p-3 rounded-lg hover:bg-green-50 transition-all duration-300"
            >
              Login with OTP
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-700 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-green-600 font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div id="forgotPasswordModal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 hidden">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your email address
              </label>
              <input
                type="email"
                id="forgotPasswordEmail"
                name="forgotPasswordEmail"
                value={forgotPasswordEmail}
                onChange={handleForgotPasswordChange}
                placeholder="Enter your email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold"
            >
              Send Reset Link
            </button>
          </form>
          {forgotPasswordMessage && (
            <p className="text-center text-green-600 mt-4">{forgotPasswordMessage}</p>
          )}
          <button
            type="button"
            className="w-full mt-4 bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400 transition-all duration-300 font-semibold"
            onClick={() => document.getElementById('forgotPasswordModal').style.display = 'none'}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;