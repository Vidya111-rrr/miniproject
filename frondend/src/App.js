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
import About from "./pages/About"
import './App.css';
import BidsPage from './pages/BidsPage';
import Settings from './pages/Settings';
import Admin from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoutes';
// Layout wrapper to include Header/Footer conditionally
const AppLayout = ({ children }) => {
  const location = useLocation();
  const sidebarPaths = ['/store', '/WasteCollectionForm', '/recyclingservicesform', '/confirmation'];
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
          <Route path="/about" element={<About />} />
          
          {/* Protected Routes based on roles */}
          <Route
            path="/WasteCollectionForm"
            element={
              <ProtectedRoute allowedRoles={['generator']}>
                <WasteCollectionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recyclingservicesform"
            element={
              <ProtectedRoute allowedRoles={['wastecollector']}>
                <RecyclingServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bids"
            element={
              <ProtectedRoute allowedRoles={['generator']}>
                <BidsPage />
              </ProtectedRoute>
            }
          />

          {/*  Common pages */}
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
