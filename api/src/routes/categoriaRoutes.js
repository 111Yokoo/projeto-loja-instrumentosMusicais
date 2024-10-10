import express from "express";
import {
  obterCategoriasController,
  criarCategoriaController,
  obterCategoriaController,
  atualizarCategoriaController,
  deletarCategoriaController,
} from "../controllers/categoriaController.js";

import { verificarToken, verificarAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para listar todas as categorias (Admin Only)
router.get("/", verificarToken, verificarAdmin, obterCategoriasController);

// Rota para criar uma nova categoria (Admin Only)
router.post("/", verificarToken, verificarAdmin, criarCategoriaController);

// Rota para obter uma categoria por ID
router.get("/:id", verificarToken, obterCategoriaController);

// Rota para atualizar uma categoria por ID (Admin Only)
router.put("/:id", verificarToken, verificarAdmin, atualizarCategoriaController);

// Rota para deletar uma categoria por ID (Admin Only)
router.delete("/:id", verificarToken, verificarAdmin, deletarCategoriaController);

export default router;
