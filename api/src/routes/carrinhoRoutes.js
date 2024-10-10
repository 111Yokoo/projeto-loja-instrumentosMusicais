import express from "express";
import {
  adicionarItemAoCarrinhoController,
  editarItemDoCarrinhoController,
  excluirItemDoCarrinhoController,
  listarItensDoCarrinhoController,
} from "../controllers/carrinhoController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para listar os itens do carrinho do usuário autenticado
router.get("/carrinho", verificarToken, listarItensDoCarrinhoController);

// Rota para adicionar um item ao carrinho do usuário autenticado
router.post("/carrinho", verificarToken, adicionarItemAoCarrinhoController);

// Rota para editar um item do carrinho do usuário autenticado
router.put("/carrinho", verificarToken, editarItemDoCarrinhoController);

// Rota para excluir um item do carrinho do usuário autenticado
router.delete(
  "/carrinho/:produtoId",
  verificarToken,
  excluirItemDoCarrinhoController
);

export default router;
