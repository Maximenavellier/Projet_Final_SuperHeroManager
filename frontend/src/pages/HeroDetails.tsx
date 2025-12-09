import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchHeroById, deleteHero } from '../api/heroApi';
import { IHero } from '../types/Hero';
import { useAuth } from '../context/AuthContext';

const HeroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); // On récupère les infos user
  const [hero, setHero] = useState<IHero | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const fallbackImage = "https://placehold.co/600x900?text=Image+Non+Trouvée";

  useEffect(() => {
    const getHero = async () => {
      if (id) {
        try {
          const { data } = await fetchHeroById(id);
          setHero(data);
          
          const correctImageUrl = data.image.startsWith('http') 
            ? data.image 
            : `http://localhost:5000/uploads/${data.image}`;
          
          setImgSrc(correctImageUrl);
        } catch (error) {
          console.error("Erreur chargement héros", error);
        }
      }
    };
    getHero();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce héros ?") && id) {
      try {
        await deleteHero(id);
        navigate('/dashboard');
      } catch (error) {
        console.error("Erreur suppression", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (!hero) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>;

  // --- LOGIQUE DE SECURITE ---
  const isVisitor = !isAuthenticated || user?.role === 'visitor';
  const isAdmin = user?.role === 'admin';
  // ---------------------------

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:underline mb-6 font-semibold">
        ← Retour au tableau de bord
      </Link>

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden md:flex max-w-5xl mx-auto">
        {/* Colonne Image */}
        <div className="md:w-1/2 lg:w-2/5 bg-gray-100 relative min-h-[400px]">
          <img 
            className="w-full h-full object-cover absolute inset-0" 
            src={imgSrc} 
            alt={hero.nom}
            onError={() => setImgSrc(fallbackImage)}
          />
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
            {hero.univers}
          </div>
        </div>
        
        {/* Colonne Détails */}
        <div className="p-8 md:w-1/2 lg:w-3/5 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{hero.nom}</h1>
            <h2 className="text-xl text-gray-600 italic mb-6 font-medium">{hero.alias}</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-3 border-b pb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{hero.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-3 border-b pb-2">Pouvoirs</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(hero.pouvoirs) && hero.pouvoirs.map((p, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Boutons d'action (PROTECTION VISUELLE) */}
          {/* On affiche les boutons SEULEMENT si on n'est PAS un visiteur */}
          {!isVisitor && (
            <div className="flex gap-4 mt-4 pt-6 border-t">
              
              {/* Le bouton Modifier est pour Admin et Editeur (donc tout le monde sauf visiteur) */}
              <Link 
                to={`/edit/${hero._id}`}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Modifier
              </Link>
              
              {/* Le bouton Supprimer est RESERVE aux Admins */}
              {isAdmin && (
                <button 
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Supprimer
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;