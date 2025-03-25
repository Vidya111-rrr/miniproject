import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterGenerator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    generatorId: generateGeneratorId(),
    username: "",
    email: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function generateGeneratorId() {
    return `G${Math.floor(100 + Math.random() * 900)}`;
  }

  const validateUsername = (username) => {
    const usernameRegex = /^(?!\d)[a-zA-Z0-9_]{5,}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      setUsernameError(
        validateUsername(value) ? "" : "Username must be at least 5 characters, start with a letter, and can contain letters, numbers, and underscores."
      );
    }

    if (name === "password") {
      setPasswordError(
        validatePassword(value) ? "" : "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernameError && !passwordError && formData.username && formData.password) {
      console.log("Generator Registered:", formData);
      alert(`Registration Successful! Your Generator ID: ${formData.generatorId}`);
      navigate("/login"); // Navigate to login page
    } else {
      alert("Please fix errors before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-700 to-green-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-700">Register as Generator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="generatorId"
            value={formData.generatorId}
            readOnly
            className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
          />

          <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded" required onChange={handleChange} />
          {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}

          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" required onChange={handleChange} />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-all" disabled={!!usernameError || !!passwordError}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterGenerator;
