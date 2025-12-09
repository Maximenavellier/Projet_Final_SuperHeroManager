import express from 'express';
// Assure-toi que ces fonctions existent bien dans ton contrôleur
import { createHero, getHeroes, getHeroById, updateHero, deleteHero } from '../controllers/heroController';

// --- CORRECTION ICI : Ajout des accolades { } autour de upload ---
import { upload } from '../middleware/uploadMiddleware'; 

const router = express.Router();

// Routes CRUD
router.get('/', getHeroes);
router.get('/:id', getHeroById);

// Sur POST et PUT, on utilise upload.single('image')
// C'est ici que ça plantait si upload était mal importé
router.post('/', upload.single('image'), createHero);
router.put('/:id', upload.single('image'), updateHero);

router.delete('/:id', deleteHero);

export default router;