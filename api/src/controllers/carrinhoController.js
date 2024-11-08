import {
  adicionarItemAoCarrinho,
  listarItensDoCarrinho,
  editarItemDoCarrinho,
  excluirItemDoCarrinho,
} from "../services/carrinhoService.js";

// Adicionar um item ao carrinho
export const adicionarItemAoCarrinhoController = async (req, res) => {
  const userId = req.user.userId; // ID do usuário autenticado
  const { produtoId, quantidade } = req.body;

  // Verifica se o usuário é um administrador
  if (req.user.role !== "USER") {
    return res.status(403).json({
      error: "Apenas usuários podem ter carrinhos.",
    });
  }

  try {
    const carrinho = await adicionarItemAoCarrinho(
      userId,
      produtoId,
      quantidade
    );
    res.status(201).json(carrinho);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar os itens do carrinho
export const listarItensDoCarrinhoController = async (req, res) => {
  const userId = req.user.userId; // ID do usuário autenticado

  // Verifica se o usuário é um administrador
  if (req.user.role !== "USER") {
    return res.status(403).json({
      error: "Administradores não têm carrinhos.",
    });
  }

  try {
    const carrinho = await listarItensDoCarrinho(userId);
    res.status(200).json(carrinho);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editarItemDoCarrinhoController = async (req, res) => {
  const userId = req.user.userId; // ID do usuário autenticado
  const { produtoId, quantidade } = req.body;

  console.log(`Atualizando carrinho do usuário ${userId} - Produto: ${produtoId}, Quantidade: ${quantidade}`);

  // Verifica se o usuário é um administrador
  if (req.user.role !== "USER") {
    return res.status(403).json({
      error: "Apenas usuários podem modificar seus carrinhos.",
    });
  }

  try {
    const carrinho = await editarItemDoCarrinho(userId, produtoId, quantidade);
    res.status(200).json(carrinho);
  } catch (error) {
    console.error("Erro ao editar item no carrinho:", error);  // Log do erro completo
    res.status(400).json({ error: error.message });
  }
};

// Remover um item do carrinho
export const excluirItemDoCarrinhoController = async (req, res) => {
  const userId = req.user.userId; // ID do usuário autenticado
  const { produtoId } = req.params;

  // Verifica se o usuário é um administrador
  if (req.user.role !== "USER") {
    return res.status(403).json({
      error: "Apenas usuários podem remover itens de seus carrinhos.",
    });
  }

  try {
    const carrinho = await excluirItemDoCarrinho(parseInt(userId), parseInt(produtoId));
    res.status(200).json(carrinho);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
