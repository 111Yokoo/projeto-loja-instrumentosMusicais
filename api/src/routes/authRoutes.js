
import express from 'express';
import { registro, login } from '../controllers/authController.js';

const router = express.Router();

// Rota para registrar um novo usuário (admin ou padrão)
router.post('/auth/registro', registro);

// Rota para login e obtenção de token JWT
router.post('/auth/login', login);

export default router;
