import React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Assure-toi d'avoir installé: npm install jwt-decode

// Typage de l'utilisateur (basé sur ton backend)
interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Création du contexte (non exporté directement pour forcer l'usage du hook)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Au chargement, on vérifie si un token existe déjà
  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // On suppose que le payload du token contient { user: { username, role } } ou similaire
        // Adapte selon ton authController.ts (souvent decoded.user)
        setUser(decoded.user || decoded); 
      } catch (error) {
        console.error("Token invalide", error);
        logout();
      }
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- C'EST ICI QUE LA MAGIE OPÈRE ---
// On exporte un hook personnalisé pour éviter d'importer le Context partout
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};