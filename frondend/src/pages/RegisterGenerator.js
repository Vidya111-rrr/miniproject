import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eWasteGraphic from "../assets/e-waste-graphic.png";
import eWasteBin from "../assets/e-waste-bin.png";

const RegisterGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // State for success popup
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordError(
        validatePassword(value)
          ? ""
          : "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError || !formData.password) {
      setError("Please fix password issues.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.email, // Username is set to email as per the API
          email: formData.email,
          password: formData.password,
          role: "generator",
          company: formData.company,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true); // Show success popup
        setTimeout(() => {
          navigate("/login"); // Navigate to login after 2 seconds
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error. Please try again later.");
    }
  };

  // Quotes
  const quotes = [
    { text: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan" },
    { text: "Waste isn’t waste until we waste it.", author: "Will.i.am" },
    { text: "We don’t need a handful of people doing zero waste perfectly. We need millions doing it imperfectly.", author: "Anne Marie Bonneau" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-green-600 font-poppins">Successfully Registered!</h3>
            <p className="text-gray-700 mt-2 font-roboto">Redirecting to login...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-green-600 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-poppins">EcoSync</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline text-base md:text-lg font-roboto">Home</Link>
            <Link to="/login" className="hover:underline text-base md:text-lg font-roboto">Login</Link>
            <Link to="/register" className="hover:underline text-base md:text-lg font-roboto">Register</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center mt-20 p-4 md:p-8">
        <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-7xl gap-8">
          {/* Left Division: E-Waste Graphic, Quotes, and E-Waste Bin */}
          <div className="w-full lg:w-2/5 flex flex-col items-center">
            {/* E-Waste Graphic */}
            <div className="w-full max-w-lg mb-6">
              <img src={eWasteGraphic} alt="E-Waste Graphic" className="w-full h-auto object-contain" />
            </div>

            {/* Quotes Section */}
            <div className="w-full max-w-lg">
              <h3 className="text-3xl md:text-4xl font-semibold text-green-600 mb-4 text-center font-poppins">
                Why E-Waste Matters
              </h3>
              <div className="space-y-4">
                {quotes.map((quote, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-gray-700 italic font-roboto text-lg">"{quote.text}"</p>
                    <p className="text-green-600 text-base mt-2 text-right font-roboto font-medium">
                      — {quote.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Small E-Waste Bin Image */}
            <div className="w-full max-w-lg mt-6 flex justify-center">
              <img src={eWasteBin} alt="E-Waste Bin" className="w-32 h-auto object-contain" />
            </div>
          </div>

          {/* Center Division: Subtle Divider */}
          <div className="hidden lg:block w-px h-[32rem] bg-gray-300"></div>

          {/* Right Division: Registration Form */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-600 font-poppins">
                Register as Generator
              </h2>
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center font-roboto text-base">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1 font-roboto">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto text-base"
                    required
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1 font-roboto">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto text-base"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>

                {/* Company Input */}
                <div>
                  <label htmlFor="company" className="block text-base font-medium text-gray-700 mb-1 font-roboto">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Enter your company name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto text-base"
                    onChange={handleChange}
                    value={formData.company}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1 font-roboto">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto text-base"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1 font-roboto">{passwordError}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold font-roboto text-lg"
                  disabled={!!passwordError}
                >
                  Register
                </button>

                {/* Back to Selection */}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="w-full border border-green-600 text-green-600 p-4 rounded-lg hover:bg-green-50 transition-all duration-300 font-roboto text-lg"
                >
                  Back to Selection
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterGenerator;