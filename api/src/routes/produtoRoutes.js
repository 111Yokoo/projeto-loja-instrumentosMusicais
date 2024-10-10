import express from "express";
import upload from "../middleware/multerConfig.js";

import {
  criarProdutoController,
  obterProdutos,
  obterProduto,
  editarProduto,
  removerProduto,
} from "../controllers/produtoController.js";

import {
  verificarToken,
  verificarAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota pública para listar todos os produtos
router.get("/produtos", obterProdutos);

// Rota pública para obter um produto específico por ID
router.get("/produtos/:produtoId", obterProduto);

// Rota para cadastrar um novo produto (Admin Only)
router.post(
  "/produtos",
  upload.array("imagens", 10),
  verificarToken,
  verificarAdmin,
  criarProdutoController
);

// Rota para atualizar um produto (Admin Only)
router.put(
  "/produtos/:produtoId",
  verificarToken,
  verificarAdmin,
  editarProduto
);

// Rota para remover um produto (Admin Only)
router.delete(
  "/produtos/:produtoId",
  verificarToken,
  verificarAdmin,
  removerProduto
);

export default router;
