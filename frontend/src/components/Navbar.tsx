import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold hover:text-blue-100 transition">
          SuperHero Manager
        </Link>
        
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {/* LIEN ADMIN : Visible seulement si role === admin */}
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-yellow-300 font-bold hover:text-yellow-100 border border-yellow-300 px-3 py-1 rounded">
                  Panel Admin
                </Link>
              )}

              <div className="text-right">
                <span className="block font-semibold">{user?.username}</span>
                <span className="block text-xs text-blue-200 uppercase">{user?.role}</span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition shadow"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <div className="space-x-4">
               <Link to="/login" className="hover:underline">Connexion</Link>
               <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded font-bold hover:bg-gray-100">Inscription</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;