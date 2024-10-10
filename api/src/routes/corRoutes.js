import express from "express";
import {
  obterCoresController,
  criarCorController,
  obterCorController,
  atualizarCorController,
  deletarCorController,
} from "../controllers/corController.js";

import { verificarToken, verificarAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para listar todas as cores (Admin Only)
router.get("/", verificarToken, verificarAdmin, obterCoresController);

// Rota para criar uma nova cor (Admin Only)
router.post("/", verificarToken, verificarAdmin, criarCorController);

// Rota para obter uma cor por ID
router.get("/:id", verificarToken, obterCorController);

// Rota para atualizar uma cor por ID (Admin Only)
router.put("/:id", verificarToken, verificarAdmin, atualizarCorController);

// Rota para deletar uma cor por ID (Admin Only)
router.delete("/:id", verificarToken, verificarAdmin, deletarCorController);

export default router;
