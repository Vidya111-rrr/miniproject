import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Leaf } from "lucide-react";

const SelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Join EcoSync & Make a Difference! 🌍
      </h1>
      <p className="text-gray-600 text-lg mb-10 text-center max-w-lg">
        Choose how you want to contribute to a cleaner and greener world.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Request Waste Collection Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center cursor-pointer transition-all hover:shadow-xl"
          onClick={() => navigate("/RegisterGenerator")}
        >
          <Truck size={60} className="text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-green-700">Request Collection</h2>
          <p className="text-gray-600 mt-2">
            Need waste pickup? Request a collector to take care of it.
          </p>
          <button className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
            Request Now
          </button>
        </motion.div>

        {/* Become a Waste Collector Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center cursor-pointer transition-all hover:shadow-xl"
          onClick={() => navigate("/RegisterCollector")}
        >
          <Leaf size={60} className="text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-green-700">Become a Collector</h2>
          <p className="text-gray-600 mt-2">
            Join as a collector and help keep our communities clean.
          </p>
          <button className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
            Sign Up
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionPage;