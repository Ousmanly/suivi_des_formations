import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateToken } from '../Auth/auth.js';


const router = express.Router();

router.post('/', UserController.creerUtilisateur);

router.get('/:id',authenticateToken, UserController.recupererUtilisateurParId);

router.put('/:id',authenticateToken, UserController.mettreAJourUtilisateur);

router.delete('/:id',authenticateToken, UserController.supprimerUtilisateur);


export  {router};
