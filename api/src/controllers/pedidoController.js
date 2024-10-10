import {
  criarPedido,
  listarPedidos,
  listarVendas,
} from "../services/pedidoService.js";

// Controller para criar um pedido a partir dos itens do carrinho
export const criarPedidoController = async (req, res) => {
  const userId = req.user.userId; // Pega o ID do usuário autenticado
  const { metodoPagamento } = req.body;

  // Verifica se o usuário é um administrador
  if (req.user.role === "ADMIN") {
    return res.status(403).json({
      error: "Administradores não podem fazer pedidos.",
    });
  }

  try {
    // Chama o service para criar o pedido, agora pegando o endereço do usuário
    const pedido = await criarPedido(userId, metodoPagamento);
    res.status(201).json(pedido); // Retorna o pedido criado
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller para listar todos os pedidos do usuário autenticado (usuário comum)
export const listarPedidosController = async (req, res) => {
  const userId = req.user.userId; // Pega o ID do usuário autenticado

  // Verifica se o usuário é um administrador
  if (req.user.role === "ADMIN") {
    return res.status(403).json({
      error: "Administradores não têm histórico de pedidos.",
    });
  }

  try {
    const pedidos = await listarPedidos(userId);
    res.status(200).json(pedidos); // Retorna os pedidos do usuário
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller para listar todas as vendas (apenas para admin)
export const listarVendasController = async (req, res) => {
  const role = req.user.role; // Verifica o papel do usuário autenticado (admin ou comum)

  if (role !== "ADMIN") {
    return res.status(403).json({
      error:
        "Acesso negado. Somente administradores podem ver todas as vendas.",
    });
  }

  try {
    const vendas = await listarVendas();
    res.status(200).json(vendas); // Retorna todas as vendas (pedidos de todos os usuários)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
