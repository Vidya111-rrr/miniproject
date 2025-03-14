import { useState } from "react";
import RegisterGenerator from "../pages/RegisterGenerator";
import RegisterCollector from "../pages/RegisterCollector";

const Register = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-4xl font-extrabold text-white mb-8 animate-fade-in">
        Join Our Smart Waste Management Platform
      </h1>

      {!activeForm ? (
        <div className="flex space-x-6">
          {/* Collector Button */}
          <button
            className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-600 hover:text-white transform hover:scale-105 transition-all duration-300"
            onClick={() => setActiveForm("collector")}
          >
            🚛 Register as Collector
          </button>

          {/* Generator Button */}
          <button
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300"
            onClick={() => setActiveForm("generator")}
          >
            🔄 Register as Generator
          </button>
        </div>
      ) : (
        <div className="mt-6 w-full flex justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 animate-slide-in">
            {activeForm === "collector" ? <RegisterCollector /> : <RegisterGenerator />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
