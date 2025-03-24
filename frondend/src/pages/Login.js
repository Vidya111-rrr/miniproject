import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
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
      const response = await fetch("http://localhost:4000/api/login", { // ✅ Correct API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      //localStorage.setItem("userRole", data.role); // ✅ Save user role

      // Redirect based on user role
      //if (data.role === "collector") {
       // navigate("/recyclingservicesform");
      //} else if (data.role === "generator") {
        //navigate("/wastecollectionform");
      //} else {
        //throw new Error("Unknown role");
      //}
      navigate("/recyclingservicesform");
      alert("Login Successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-700 to-green-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
              onChange={handleChange}
            />
          </div>

          {/* Password Input with Toggle Visibility */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "👁️" : "🙈"}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
