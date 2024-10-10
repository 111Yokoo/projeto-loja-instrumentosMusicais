import express from "express";
import {
  criarPedidoController,
  listarPedidosController,
  listarVendasController,
} from "../controllers/pedidoController.js";
import {
  verificarAdmin,
  verificarToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para criar um pedido (converter carrinho em pedido)
router.post("/pedidos", verificarToken, criarPedidoController);

// Rota para listar os pedidos do próprio usuário (usuários comuns)
router.get("/pedidos", verificarToken, listarPedidosController);

// Rota para listar todas as vendas (somente para administradores)
router.get("/vendas", verificarToken, verificarAdmin, listarVendasController);

export default router;
