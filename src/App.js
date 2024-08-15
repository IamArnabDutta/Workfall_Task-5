import React, { useEffect } from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import WorkOffers from './components/WorkOffers';
import Review from './components/Review';
import Client from './components/Client';
import Form from './components/Form';
import Error from './components/Error';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && location.pathname === '/login') {
      navigate('/dashboard', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect root path to /signup */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/dashboard/workoffers" element={<ProtectedRoute element={<WorkOffers />} />} />
          <Route path="/dashboard/reviews" element={<ProtectedRoute element={<Review />} />} />
          <Route path="/dashboard/clients" element={<ProtectedRoute element={<Client />} />} />
          <Route path="/dashboard/associates" element={<ProtectedRoute element={<Form />} />} />
          


        </Routes>

      </main>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
