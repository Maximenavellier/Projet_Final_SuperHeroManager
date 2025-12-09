import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 1. Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Ce nom d'utilisateur est déjà pris." });
    }

    // 2. Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Création de l'utilisateur
    // Note: On ne définit pas le rôle ici, il sera 'visitor' par défaut grâce au Modèle
    const newUser = new User({
      username,
      passwordHash
    });

    await newUser.save();

    // 4. Génération du token pour connexion immédiate
    const token = jwt.sign(
      { user: { id: newUser._id, username: newUser.username, role: newUser.role } },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, role: newUser.role } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
};

// ... Garde tes fonctions login et getAllUsers en dessous ...
export const login = async (req: Request, res: Response) => {
    // ... ton code de login existant ...
    // (Si tu as besoin du code de login dis le moi, sinon garde le tien)
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign(
            { user: { id: user._id, username: user.username, role: user.role } },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find().select('-passwordHash');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
};