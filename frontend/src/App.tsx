import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import HeroDetails from './pages/HeroDetails';
import HeroForm from './pages/HeroForm';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hero/:id" element={<HeroDetails />} />
          
          {/* Routes Protégées (Nécessitent une connexion) */}
          <Route path="/add-hero" element={
            <ProtectedRoute>
              <HeroForm />
            </ProtectedRoute>
          } />
          
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <HeroForm />
            </ProtectedRoute>
          } />

          {/* 2. Route Admin Protégée */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;