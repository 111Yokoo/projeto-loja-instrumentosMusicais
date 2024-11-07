import prisma from "./prismaClient.js";

export const criarProduto = async (data) => {
  const {
    nome,
    preco,
    estoque,
    descricao,
    tituloInformacao,
    visibilidade,
    informacao,
    imagens,
    categoriaId,
    cores,
  } = data;

  // Cria o produto sem as cores associadas
  const produto = await prisma.produto.create({
    data: {
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      descricao,
      tituloInformacao,
      visibilidade,
      informacao,
      imagens: {
        create: Array.isArray(imagens)
          ? imagens.map((imagem) => ({ url: imagem }))
          : [],
      },
      categoria: {
        connect: { id: categoriaId },
      },
    },
  });
  console.log("chegou no service", cores);

  // Adiciona as cores associadas usando o produtoId recém-criado, uma por uma
  if (cores && cores.length > 0) {
    await Promise.all(
      cores.map(async (corId) => {
        await prisma.produtoCor.create({
          data: {
            corId: corId,
            produtoId: produto.id,
          },
        });
      })
    );
  }

  // Retorna o produto com as cores e imagens associadas
  return await prisma.produto.findUnique({
    where: { id: produto.id },
    include: {
      imagens: true,
      categoria: true,
      cores: {
        include: {
          cor: true, // Inclui os detalhes da cor
        },
      },
    },
  });
};

export const listarProdutos = async () => {
  const produtos = await prisma.produto.findMany({
    include: {
      imagens: true,
      categoria: true,
      cores: {
        include: {
          cor: true, // Inclui os detalhes da cor
        },
      },
    },
  });

  const produtosFormatados = produtos.map((produto) => {
    const imagensFormatadas = produto.imagens.map((imagem) => {
      return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
    });

    const coresFormatadas = produto.cores.map((produtoCor) => ({
      id: produtoCor.cor.id,
      nome: produtoCor.cor.nome,
      hexadecimal: produtoCor.cor.hexadecimal,
    }));

    return {
      ...produto,
      imagens: imagensFormatadas,
      cores: coresFormatadas,
    };
  });

  return produtosFormatados;
};

export const obterProdutoPorId = async (produtoId) => {
  const produto = await prisma.produto.findUnique({
    where: { id: produtoId },
    include: {
      imagens: true,
      categoria: true, // Inclui a categoria no retorno
      cores: true, // Inclui as cores no retorno
    },
  });

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  const imagensFormatadas = produto.imagens.map((imagem) => {
    return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
  });

  return {
    ...produto,
    imagens: imagensFormatadas,
  };
};

export const atualizarProduto = async (produtoId, data) => {
  const {
    nome,
    preco,
    estoque,
    descricao,
    visibilidade,
    imagens,
    categoriaId,
    cores,
  } = data;

  const updateData = {
    nome,
    preco: parseFloat(preco),
    estoque: parseInt(estoque),
    descricao,
    visibilidade: visibilidade === "true", // Certifique-se de que seja booleano
  };

  if (imagens) {
    updateData.imagens = {
      deleteMany: {}, // Deleta todas as imagens relacionadas ao produto
      create: imagens.map((imagem) => ({ url: imagem })), // Cria as novas imagens
    };
  }

  if (categoriaId) {
    updateData.categoria = {
      connect: { id: parseInt(categoriaId) }, // Conecta a categoria
    };
  }

  if (cores) {
    updateData.cores = {
      set: cores.map((corId) => ({ id: parseInt(corId) })), // Atualiza as cores conectadas
    };
  }

  return await prisma.produto.update({
    where: { id: produtoId },
    data: updateData,
    include: {
      imagens: true,
      categoria: true, // Inclui a categoria no retorno
      cores: true, // Inclui as cores no retorno
    },
  });
};

export const deletarProduto = async (produtoId) => {
  const produtoExistente = await prisma.produto.findUnique({
    where: { id: produtoId },
  });

  if (!produtoExistente) {
    throw new Error("Produto não encontrado.");
  }

  await prisma.imagemProduto.deleteMany({
    where: { produtoId },
  });

  await prisma.venda.deleteMany({
    where: { produtoId },
  });

  await prisma.carrinho.deleteMany({
    where: { produtoId },
  });

  return await prisma.produto.delete({
    where: { id: produtoId },
  });
};
