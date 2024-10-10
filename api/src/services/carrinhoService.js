import prisma from "./prismaClient.js";

export const adicionarItemAoCarrinho = async (
  userId,
  produtoId,
  quantidade
) => {
  // Verifica se o item já existe no carrinho do usuário
  const itemExistente = await prisma.carrinho.findFirst({
    where: {
      userId: userId,
      produtoId: produtoId,
    },
  });

  if (itemExistente) {
    // Atualiza a quantidade se o item já existir
    return await prisma.carrinho.update({
      where: { id: itemExistente.id },
      data: {
        quantidade: itemExistente.quantidade + quantidade,
      },
    });
  } else {
    // Adiciona o item ao carrinho se não existir
    return await prisma.carrinho.create({
      data: {
        userId: userId,
        produtoId: produtoId,
        quantidade: quantidade,
      },
    });
  }
};

export const listarItensDoCarrinho = async (userId) => {
  // Busca todos os itens do carrinho do usuário autenticado
  const itensCarrinho = await prisma.carrinho.findMany({
    where: {
      userId: userId, // Filtra pelo userId do usuário autenticado
    },
    include: {
      produto: true, // Inclui os detalhes do produto no retorno
    },
  });

  // Formatar o retorno no formato desejado
  return {
    id: userId, // ID do usuário autenticado
    userId: userId, // Vincula o carrinho ao usuário
    "produtos-carrinho": itensCarrinho.map((item) => ({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      produto: {
        id: item.produto.id,
        nome: item.produto.nome,
        preco: item.produto.preco,
        estoque: item.produto.estoque,
        descricao: item.produto.descricao,
      },
    })),
  };
};

export const editarItemDoCarrinho = async (userId, produtoId, quantidade) => {
  // Verifica se o item existe no carrinho do usuário
  const itemCarrinho = await prisma.carrinho.findFirst({
    where: { userId: userId, produtoId: produtoId },
  });

  // Se o produto não estiver no carrinho, informa isso
  if (!itemCarrinho) {
    throw new Error("Este produto não está no carrinho.");
  }

  // Atualiza a quantidade do item
  return await prisma.carrinho.update({
    where: { id: itemCarrinho.id },
    data: {
      quantidade: quantidade,
    },
  });
};

export const excluirItemDoCarrinho = async (userId, produtoId) => {
  // Verifica se o item pertence ao carrinho do usuário
  const itemCarrinho = await prisma.carrinho.findFirst({
    where: {
      userId: userId,
      produtoId: produtoId,
    },
  });

  if (!itemCarrinho) {
    throw new Error(
      "Você não tem permissão para excluir este item do carrinho ou ele não existe."
    );
  }

  // Exclui o item do carrinho
  return await prisma.carrinho.delete({
    where: { id: itemCarrinho.id },
  });
};
