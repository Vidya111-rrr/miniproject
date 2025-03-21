import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import RegisterGenerator from "./pages/RegisterGenerator";
import RegisterCollector from "./pages/RegisterCollector";

import Selection from './pages/Selection';
import WasteCollectionForm from './pages/WasteCollectionForm';
import RecyclingServices from './pages/RecyclingServicesForm';
import ConfirmationPage from './pages/ConfirmationPage';
import Store from './pages/Store';
import './App.css';

function App() {
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login userCredentials={userCredentials} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registergenerator" element={<RegisterGenerator setUserCredentials={setUserCredentials} />} />
            <Route path="/registercollector" element={<RegisterCollector setUserCredentials={setUserCredentials} />} />
            <Route path="/selection" element={<Selection />} />
            <Route path="/WasteCollectionForm" element={<WasteCollectionForm />} />
            <Route path="/recyclingservicesform" element={<RecyclingServices />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/store" element={<Store />} />  {/* Added Store Page */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
