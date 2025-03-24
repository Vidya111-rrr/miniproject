import React, { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-teal-700">Get in Touch with EcoSync</h1>
      <p className="text-center text-gray-600 mt-2">Have questions? Reach out to us!</p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Left - Contact Info */}
        <div className="bg-teal-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">Contact Information</h2>
          <p className="flex items-center gap-2 text-gray-700"><Mail size={20} /> Email: support@ecosync.com</p>
          <p className="flex items-center gap-2 text-gray-700 mt-2"><Phone size={20} /> Phone: +123 456 7890</p>
          <p className="flex items-center gap-2 text-gray-700 mt-2"><MapPin size={20} /> Address: 123 EcoSync St, Green City, Earth</p>

          <h3 className="mt-6 text-xl font-semibold text-teal-700">Follow Us</h3>
          <div className="flex gap-4 mt-3">
            <a href="https://facebook.com/ecosync" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700"><Facebook size={24} /></a>
            <a href="https://twitter.com/ecosync" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700"><Twitter size={24} /></a>
            <a href="https://instagram.com/ecosync" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700"><Instagram size={24} /></a>
            <a href="https://linkedin.com/company/ecosync" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700"><Linkedin size={24} /></a>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-32"></textarea>
            <button type="submit" className="w-full bg-teal-700 text-white py-3 rounded-lg font-bold hover:bg-teal-600 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-10">
        <iframe
          title="EcoSync Location"
          src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
          width="100%"
          height="300"
          allowFullScreen
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;