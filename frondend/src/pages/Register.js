import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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
        {/* Attractive Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center font-poppins">
          Be a Part of Us – Transform Waste into Opportunity!
        </h1>
        <p className="text-gray-700 text-center mb-8 font-roboto text-lg max-w-2xl">
          Join EcoSync and contribute to a sustainable future by managing e-waste effectively. Choose your role and start making a difference today!
        </p>

        {/* Role Selection Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {/* Collector Button */}
          <button
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-300 font-roboto"
            onClick={() => navigate("/registercollector")}
          >
            🚛 Register as Collector
          </button>

          {/* Generator Button */}
          <button
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-300 font-roboto"
            onClick={() => navigate("/registergenerator")}
          >
            🔄 Register as Generator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;