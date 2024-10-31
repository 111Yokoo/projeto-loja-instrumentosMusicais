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
router.get("/cores", verificarToken, verificarAdmin, obterCoresController);

// Rota para criar uma nova cor (Admin Only)
router.post("/cores", verificarToken, verificarAdmin, criarCorController);

// Rota para obter uma cor por ID
router.get("/cores/:id", verificarToken, obterCorController);

// Rota para atualizar uma cor por ID (Admin Only)
router.put("/cores/:id", verificarToken, verificarAdmin, atualizarCorController);

// Rota para deletar uma cor por ID (Admin Only)
router.delete("/cores/:id", verificarToken, verificarAdmin, deletarCorController);

export default router;
