import prisma from "./prismaClient.js";

export const criarProduto = async (data) => {
  const { nome, preco, estoque, descricao, tituloInformacao, visibilidade, informacao, imagens } = data;

  return await prisma.produto.create({
    data: {
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      descricao,
      tituloInformacao,
      visibilidade,
      informacao,
      imagens: {
        create: imagens.map((imagem) => ({ url: imagem })), // Cria uma entrada para cada imagem
      },
    },
  });
};

export const listarProdutos = async () => {
  const produtos = await prisma.produto.findMany({
    include: { imagens: true },
  });

  // Formata a URL das imagens
  const produtosFormatados = produtos.map((produto) => {
    const imagensFormatadas = produto.imagens.map((imagem) => {
      return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
    });

    return {
      ...produto,
      imagens: imagensFormatadas,
    };
  });

  return produtosFormatados;
};

export const obterProdutoPorId = async (produtoId) => {
  const produto = await prisma.produto.findUnique({
    where: { id: produtoId },
    include: { imagens: true }, // Inclui as imagens do produto
  });

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  // Formata a URL das imagens
  const imagensFormatadas = produto.imagens.map((imagem) => {
    return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
  });

  // Retorna o produto com as URLs das imagens formatadas
  return {
    ...produto,
    imagens: imagensFormatadas,
  };
};

export const atualizarProduto = async (produtoId, data) => {
  const { nome, preco, estoque, descricao, imagens } = data;

  // Dados de atualização
  let updateData = {
    nome,
    preco,
    estoque,
    descricao,
  };

  // Se o campo `imagens` for fornecido, crie ou atualize as imagens
  if (imagens) {
    updateData.imagens = {
      deleteMany: {}, // Deleta todas as imagens relacionadas ao produto
      create: imagens.map((imagem) => ({ url: imagem.url })), // Cria as novas imagens
    };
  }

  // Atualiza o produto no banco de dados
  return await prisma.produto.update({
    where: { id: produtoId },
    data: updateData,
    include: {
      imagens: true, // Inclui as imagens no retorno
    },
  });
};

export const deletarProduto = async (produtoId) => {
  // Verifica se o produto existe
  const produtoExistente = await prisma.produto.findUnique({
    where: { id: produtoId },
  });

  if (!produtoExistente) {
    throw new Error("Produto não encontrado.");
  }

  // Deleta imagens relacionadas ao produto
  await prisma.imagemProduto.deleteMany({
    where: { produtoId },
  });

  // Deleta vendas relacionadas ao produto
  await prisma.venda.deleteMany({
    where: { produtoId },
  });

  // Deleta itens do carrinho relacionados ao produto
  await prisma.carrinho.deleteMany({
    where: { produtoId },
  });

  // Agora deleta o produto
  return await prisma.produto.delete({
    where: { id: produtoId },
  });
};
