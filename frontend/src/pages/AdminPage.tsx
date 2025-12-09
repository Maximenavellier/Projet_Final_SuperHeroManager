import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserData {
  _id: string;
  username: string;
  role: string;
  createdAt?: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const { user } = useAuth(); // Pour vérifier si c'est bien un admin
  const navigate = useNavigate();

  useEffect(() => {
    // Sécurité : Si pas admin, on vire !
    if (user?.role !== 'admin') {
      alert("Accès interdit : Réservé aux administrateurs");
      navigate('/dashboard');
      return;
    }

    const getUsers = async () => {
      try {
        const { data } = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erreur chargement utilisateurs", error);
      }
    };
    getUsers();
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Administration - Gestion des Utilisateurs
      </h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nom d'utilisateur
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date d'inscription
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap font-mono text-xs">{u._id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap font-bold">{u.username}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
                    u.role === 'admin' ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'
                  }`}>
                    <span className="relative">{u.role}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;