import express from "express";
import upload from "../middleware/multerConfig.js";

import {
  obterUsuarios,
  deletarUsuarioController,
  atualizarPerfilUsuario,
  obterPerfilUsuario,
  atualizarUsuarioController,
  atualizarFotoController,
} from "../controllers/userController.js";

import {
  verificarToken,
  verificarAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para listar todos os usuários (Admin Only)
router.get("/users", verificarToken, verificarAdmin, obterUsuarios);

// Rota para atualizar o tipo de usuário (Admin)
router.put(
  "/users/:userId",
  verificarToken,
  verificarAdmin,
  atualizarUsuarioController
);

// Rota para excluir um usuário (Admin Only)
router.delete(
  "/users/:userId",
  verificarToken,
  verificarAdmin,
  deletarUsuarioController
);

// Rota para obter o perfil do próprio usuário
router.get("/perfil", verificarToken, obterPerfilUsuario);

// Rota para atualizar os dados do perfil (usuário autenticado)
router.patch("/perfil", verificarToken, atualizarPerfilUsuario);

// Rota para atualizar apenas a foto de perfil
router.put(
  "/perfil/foto",
  verificarToken,
  upload.single("imagem"),
  atualizarFotoController
);

export default router;
