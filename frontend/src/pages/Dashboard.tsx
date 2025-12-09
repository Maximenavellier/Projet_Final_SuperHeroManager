import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // <--- Import nécessaire pour le lien
import { fetchHeroes } from '../api/heroApi';
import HeroCard from '../components/HeroCard';
import { IHero } from '../types/Hero';
import { useAuth } from '../context/AuthContext'; // <--- Import pour vérifier le rôle

const Dashboard = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [loading, setLoading] = useState(true);
  
  // On récupère les infos de l'utilisateur pour savoir si on affiche le bouton "Ajouter"
  const { user, isAuthenticated } = useAuth(); 

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnivers, setSelectedUnivers] = useState('Tous');
  const [sortOrder, setSortOrder] = useState('alphabetical'); 

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const { data } = await fetchHeroes();
        setHeroes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des héros", error);
      } finally {
        setLoading(false);
      }
    };
    loadHeroes();
  }, []);

  // Logique de filtrage et tri combinée
  const processedHeroes = heroes
    .filter(h => {
      // 1. Filtre Recherche (Nom ou Alias)
      const matchesSearch = 
        h.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (h.alias && h.alias.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // 2. Filtre Univers
      // Attention : assure-toi que tes valeurs ici correspondent exactement à ta BDD (ex: "Marvel Comics" vs "Marvel")
      const matchesUnivers = selectedUnivers === 'Tous' || h.univers === selectedUnivers;

      return matchesSearch && matchesUnivers;
    })
    .sort((a, b) => {
      // 3. Tri
      if (sortOrder === 'alphabetical') {
        return a.nom.localeCompare(b.nom);
      } else if (sortOrder === 'recent') {
        return b._id.localeCompare(a._id);
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 pb-12">
      
      {/* En-tête avec Titre et Bouton Ajouter */}
      <div className="flex flex-col md:flex-row justify-between items-center my-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Tableau de Bord des Héros
        </h1>
        
        {/* BOUTON AJOUTER : Visible seulement si connecté et PAS visiteur */}
        {isAuthenticated && user?.role !== 'visitor' && (
          <Link 
            to="/add-hero"
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center"
          >
            <span className="mr-2">+</span> Ajouter un Héros
          </Link>
        )}
      </div>
      
      {/* Barre d'outils (Recherche + Filtres) */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Recherche */}
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <input 
              type="text" 
              placeholder="Nom ou alias..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtre Univers */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Univers</label>
            <select 
              value={selectedUnivers}
              onChange={(e) => setSelectedUnivers(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="Tous">Tous les univers</option>
              <option value="Marvel Comics">Marvel Comics</option>
              <option value="DC Comics">DC Comics</option>
              <option value="Autre">Autre</option>
              <option value="Dark Horse Comics">Dark Horse Comics</option>
            </select>
          </div>

          {/* Tri */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="alphabetical">Ordre Alphabétique (A-Z)</option>
              <option value="recent">Date d'ajout (Plus récent)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Liste des résultats */}
      {loading ? (
        <div className="flex justify-center my-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {processedHeroes.map((hero) => (
              <HeroCard key={hero._id} hero={hero} />
            ))}
          </div>
          
          {processedHeroes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun super-héros ne correspond à tes critères.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedUnivers('Tous');}}
                className="mt-4 text-blue-600 hover:underline font-semibold"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;