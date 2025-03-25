import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import BidsPage from './pages/BidsPage';

// Component to determine if the sidebar should be applied
const AppLayout = ({ children }) => {
  const location = useLocation();
  const sidebarPaths = ['/store', '/WasteCollectionForm', '/recyclingservicesform', '/confirmation']; // Add paths that need the sidebar
  const hasSidebar = sidebarPaths.includes(location.pathname);

  return (
    <div className={`App ${hasSidebar ? 'with-sidebar' : ''}`}>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

function App() {
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  return (
    <Router>
      <AppLayout>
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
          <Route path="/bids" element={<BidsPage />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;