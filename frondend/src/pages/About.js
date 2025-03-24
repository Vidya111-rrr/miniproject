import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      {/* Header Section */}
      <section className="bg-teal-700 text-white p-10 rounded-lg">
        <h1 className="text-3xl font-bold">About EcoSync</h1>
        <p className="mt-2 text-lg">Empowering communities with efficient and sustainable waste management solutions.</p>
      </section>

      {/* Mission & Vision Section */}
      <section className="mt-8 text-left p-6 bg-teal-50 rounded-lg">
        <h2 className="text-2xl font-semibold text-teal-700">Our Mission</h2>
        <p className="mt-2">To bridge the gap between waste generators and collectors, ensuring a cleaner and more sustainable environment.</p>

        <h2 className="mt-6 text-2xl font-semibold text-teal-700">Our Vision</h2>
        <p className="mt-2">We envision a world where waste is managed efficiently, reducing pollution and promoting recycling.</p>
      </section>

      {/* Unique Features */}
      <section className="mt-8 text-left p-6 bg-teal-50 rounded-lg">
        <h2 className="text-2xl font-semibold text-teal-700">What Makes EcoSync Unique?</h2>
        <ul className="mt-4 space-y-3">
          <li className="bg-white p-3 rounded-md shadow-sm">✔ Real-time waste pickup requests and tracking</li>
          <li className="bg-white p-3 rounded-md shadow-sm">✔ Smart matching system for waste collectors</li>
          <li className="bg-white p-3 rounded-md shadow-sm">✔ Data-driven waste management insights</li>
          <li className="bg-white p-3 rounded-md shadow-sm">✔ Community-driven sustainability efforts</li>
        </ul>
      </section>

      {/* Future Goals */}
      <section className="mt-8 text-left p-6 bg-teal-50 rounded-lg">
        <h2 className="text-2xl font-semibold text-teal-700">Our Future Goals</h2>
        <p className="mt-2">We aim to expand our reach, integrate AI-based waste sorting, and collaborate with recycling centers for a zero-waste future.</p>
      </section>

      {/* Join Us Section */}
      <section className="mt-8 text-left p-6 bg-teal-50 rounded-lg text-center">
        <h2 className="text-2xl font-semibold text-teal-700">Be a Part of the Change</h2>
        <p className="mt-2">Join EcoSync and contribute to a sustainable tomorrow.</p>
        <a href="/register" className="inline-block mt-4 bg-teal-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-teal-600 transition">
          Get Started
        </a>
      </section>
    </div>
  );
};

export default About;