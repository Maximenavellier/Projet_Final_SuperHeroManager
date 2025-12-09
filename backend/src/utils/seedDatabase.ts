import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from '../models/Hero';
import User from '../models/User'; 
import * as fs from 'fs';
import * as path from 'path';

// Configuration du chemin vers le .env (remonte de 2 dossiers : utils -> src -> backend)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected for seeding...');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await connectDB();

  try {
    // On vide la collection existante pour éviter les doublons
    await Hero.deleteMany({});
    console.log('Heroes collection cleared.');

    // Lecture du fichier JSON
    const jsonPath = path.resolve(__dirname, './superhero.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const { superheros } = JSON.parse(rawData);

    // Transformation des données pour correspondre à ton modèle Mongoose
    const heroesToInsert = superheros.map((hero: any) => ({
      nom: hero.name,
      alias: hero.biography.aliases[0] !== '-' ? hero.biography.aliases[0] : hero.name,
      univers: hero.biography.publisher || 'Autre', // Gestion du cas où publisher est vide
      pouvoirs: Object.entries(hero.powerstats).map(([key, value]) => `${key}: ${value}`),
      description: hero.work.occupation || 'No description available.',
      image: hero.images.md,
    }));

    // Insertion des données
    await Hero.insertMany(heroesToInsert);
    console.log(`${heroesToInsert.length} heroes have been added.`);
    
    // Fermeture propre de la connexion
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();