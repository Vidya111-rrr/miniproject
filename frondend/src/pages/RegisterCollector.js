import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCollector = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    collectorId: generateCollectorId(),
    name: "",
    email: "",
    company: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");

  function generateCollectorId() {
    return `C${Math.floor(100 + Math.random() * 900)}`;
  }

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordError(
        validatePassword(value) ? "" : "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError && formData.password) {
      console.log("Collector Registered:", formData);
      alert(`Registration Successful! Your Collector ID: ${formData.collectorId}`);
      navigate("/login"); // Navigate to login page
    } else {
      alert("Please fix password issues.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-700 to-green-400">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-700">Register as Collector</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="collectorId"
            value={formData.collectorId}
            readOnly
            className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
          />

          <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" required onChange={handleChange} />
          <input type="text" name="company" placeholder="Company Name" className="w-full p-2 border rounded" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" required onChange={handleChange} />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-all" disabled={!!passwordError}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCollector;
