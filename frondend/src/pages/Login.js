import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import images
import eWasteGraphic from "../assets/e-waste-graphic.png";
import eWasteBin from "../assets/e-waste-bin.png";
import "./Login.css";

const Login = ({ userCredentials }) => {
  const [formData, setFormData] = useState(userCredentials || { email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          navigate("/");
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

  // Quotes with two entries
  const quotes = [
    { text: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan" },
    { text: "Waste isn’t waste until we waste it.", author: "Will.i.am" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-green-600 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold font-poppins">EcoSync</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline text-sm md:text-base font-roboto">Home</Link>
            <Link to="/login" className="hover:underline text-sm md:text-base font-roboto">Login</Link>
            <Link to="/register" className="hover:underline text-sm md:text-base font-roboto">Register</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center mt-16 p-4 md:p-8">
        {/* Main Layout with Three Divisions */}
        <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-7xl gap-8">
          {/* Left Division: E-Waste Graphic, Quotes, and E-Waste Bin */}
          <div className="w-full lg:w-2/5 flex flex-col items-center">
            {/* E-Waste Graphic */}
            <div className="w-full max-w-lg mb-6">
              <img
                src={eWasteGraphic}
                alt="E-Waste Graphic"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Quotes Section */}
            <div className="w-full max-w-lg">
              <h3 className="text-2xl md:text-3xl font-semibold text-green-600 mb-4 text-center font-poppins">
                Why E-Waste Matters
              </h3>
              <div className="space-y-4">
                {quotes.map((quote, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-gray-700 italic font-roboto text-base">"{quote.text}"</p>
                    <p className="text-green-600 text-base mt-2 text-right font-roboto font-medium">
                      — {quote.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Small E-Waste Bin Image */}
            <div className="w-full max-w-lg mt-6 flex justify-center">
              <img
                src={eWasteBin}
                alt="E-Waste Bin"
                className="w-32 h-auto object-contain"
              />
            </div>
          </div>

          {/* Center Division: Subtle Divider (Spacing) */}
          <div className="hidden lg:block w-px h-[32rem] bg-gray-300"></div>

          {/* Right Division: Login Form */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-600 font-poppins">
                Login to EcoSync
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email/Username Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email or username"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>

                {/* Password Input with Toggle */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 font-roboto">
                    Password
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto"
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
                    <span className="text-gray-700 font-roboto">Remember Me</span>
                  </label>
                  <Link to="/forgot-password" className="text-green-600 hover:underline font-roboto">
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold font-roboto"
                >
                  Log In
                </button>

                {/* Login with OTP */}
                <button
                  type="button"
                  className="w-full border border-green-600 text-green-600 p-3 rounded-lg hover:bg-green-50 transition-all duration-300 font-roboto"
                >
                  Login with OTP
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-700 text-sm font-roboto">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-green-600 font-semibold hover:underline">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;