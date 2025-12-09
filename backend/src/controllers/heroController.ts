import { Request, Response } from 'express';
import Hero from '../models/Hero';

// Récupérer tous les héros
export const getHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer un héros par ID
export const getHeroById = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Héros non trouvé" });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Créer un héros (avec image)
export const createHero = async (req: Request, res: Response) => {
  try {
    const image = req.file ? req.file.filename : ''; // Gestion image
    const newHero = new Hero({
      ...req.body,
      image: image
    });
    const savedHero = await newHero.save();
    res.status(201).json(savedHero);
  } catch (error) {
    res.status(500).json({ message: "Erreur création", error });
  }
};

// Mettre à jour un héros
export const updateHero = async (req: Request, res: Response) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: "Erreur mise à jour" });
  }
};

// Supprimer un héros
export const deleteHero = async (req: Request, res: Response) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: "Héros supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression" });
  }
};