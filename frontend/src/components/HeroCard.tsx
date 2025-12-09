import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Adapte le chemin si ton type IHero est ailleurs ou utilise 'any'
import { IHero } from '../types/Hero';

const HeroCard = ({ hero }: { hero: IHero }) => {
  // On construit l'URL vers le backend
  const backendImageUrl = `http://localhost:5000/uploads/${hero.image}`;
  // Image de secours générique
  const placeholderImage = "https://placehold.co/400x600?text=No+Image";

  // État pour gérer si l'image est cassée
  const [imgSrc, setImgSrc] = useState(hero.image.startsWith('http') ? hero.image : backendImageUrl);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-200">
      {/* Conteneur de l'image avec hauteur fixe */}
      <div className="h-64 overflow-hidden relative bg-gray-100">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          src={imgSrc} 
          alt={hero.nom} 
          onError={() => {
            // Si l'image ne charge pas, on remplace par le placeholder
            setImgSrc(placeholderImage); 
          }}
        />
        {/* Badge Univers */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {hero.univers}
        </div>
      </div>
      
      {/* Contenu de la carte */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">{hero.nom}</h3>
        
        {/* Description limitée à 3 lignes */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {hero.description || "Aucune description disponible."}
        </p>
        
        <Link 
          to={`/hero/${hero._id}`}
          className="mt-auto block w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Voir Détails
        </Link>
      </div>
    </div>
  );
};

export default HeroCard;