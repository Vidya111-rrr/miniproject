import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use the Header component */}
      <Header />

      {/* Main Content */}
      <div className="text-center p-12 flex-1">
        {/* Hero Section */}
        <section className="bg-teal-700 text-white p-16 rounded-lg mb-8">
          <h1 className="text-4xl font-bold mb-2">Smart Waste Management System</h1>
          <p className="text-xl font-light">Bridging waste generators with recycling heroes for a greener future 🌿♻</p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link to="/Login" className="px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500">Request Collection</Link>
            <Link to="/Login" className="px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500">Become a Collector</Link>
          </div>
        </section>

        {/* Image Section */}
        <section className="my-12">
          <img src="/images/asth.jpg" alt="Waste Management" className="mx-auto rounded-lg shadow-lg max-w-3xl" />
        </section>

        {/* How It Works */}
        <section className="bg-white p-12 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/images/request.jpg" alt="Request Pickup" className="mx-auto rounded-lg mb-4 w-52" />
              <h3 className="text-xl font-semibold text-teal-700">1. Request Pickup</h3>
              <p>Waste generators submit a collection request.</p>
            </div>
            <div className="text-center">
              <img src="/images/collection.jpg" alt="Schedule Pickup" className="mx-auto rounded-lg mb-4 w-52" />
              <h3 className="text-xl font-semibold text-teal-700">2. Accept & Schedule</h3>
              <p>Collectors accept requests and schedule pickups.</p>
            </div>
            <div className="text-center">
              <img src="/images/back.jpg" alt="Smart Disposal" className="mx-auto rounded-lg mb-4 w-52" />
              <h3 className="text-xl font-semibold text-teal-700">3. Smart Disposal</h3>
              <p>EcoSync ensures efficient waste tracking and disposal.</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-teal-100 p-12 rounded-lg mb-8">
          <h2 className="text-3xl font-semibold mb-6">Why Use EcoSync?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-teal-700">For Waste Generators</h3>
              <p>Easy scheduling, cleaner surroundings, responsible disposal.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-teal-700">For Waste Collectors</h3>
              <p>More job opportunities, easy request management, additional income.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-teal-700">For the Environment</h3>
              <p>Less pollution, better recycling, sustainable waste solutions.</p>
            </div>
          </div>
        </section>

        {/* Live Stats Section */}
        <section className="bg-white p-12 rounded-lg shadow-lg mb-8 text-center">
          <h2 className="text-3xl font-semibold mb-6">EcoSync Impact</h2>
          <div className="flex flex-wrap justify-around">
            <div className="w-full md:w-1/3 p-4">
              <h3 className="text-2xl font-bold text-teal-700">59,76,236+</h3>
              <p>Total Waste Collected</p>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <h3 className="text-2xl font-bold text-teal-700">34,56,890+</h3>
              <p>Happy Users</p>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <h3 className="text-2xl font-bold text-teal-700">99,342+ Cities</h3>
              <p>Areas Covered</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-teal-700 text-white p-12 rounded-lg mb-8">
          <h2 className="text-3xl font-semibold">What Our Users Say</h2>
          <p className="text-lg italic mt-4">"EcoSync has made waste collection so easy and efficient!" - Srishti</p>
          <p className="text-lg italic mt-2">"A game-changer for waste collectors!" - Sam</p>
        </section>

        {/* Get Started Section */}
        <section className="bg-yellow-400 p-12 rounded-lg text-black mb-8">
          <h2 className="text-3xl font-semibold">Join EcoSync Today</h2>
          <p className="text-lg mt-2">Small changes make a big difference. Sync with nature, sync with EcoSync.</p>
          <p className="text-lg mt-2">Sign up and be a part of the change.</p>
          <div className="mt-6">
            <Link to="/Selection" className="px-6 py-3 bg-teal-700 text-white font-bold rounded hover:bg-teal-800">Get Started</Link>
          </div>
        </section>

        {/* Learn More Section */}
        <section className="bg-white p-12 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-semibold">Want to Know More?</h2>
          <div className="mt-6">
            <Link to="/about" className="px-6 py-3 bg-teal-700 text-white font-bold rounded hover:bg-teal-800">Learn More</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;