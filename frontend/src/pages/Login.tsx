import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/authApi';

const Login = () => {
  const [username, setUsername] = useState(''); // ou email selon ton backend
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password }); // Adapte si c'est 'email'
      login(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Connexion</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom d'utilisateur</label>
            <input
              type="text" // ou 'email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200">
            Se connecter
          </button>
        </form>

        {/* --- C'EST ICI QU'ON AJOUTE LE LIEN --- */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Pas encore de compte ? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Créer un compte</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;