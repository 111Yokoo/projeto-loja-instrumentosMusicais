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
      cores 
    } = data;
  
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
          create: Array.isArray(imagens) ? imagens.map((imagem) => ({ url: imagem })) : [], // Verifica se imagens é um array
        },
        categoria: {
          connect: { id: categoriaId }, // Conecta a categoria
        },
        cores: {
          create: Array.isArray(cores) ? cores.map((corId) => ({ corId, produtoId: undefined })) : [], // Cria as entradas na tabela ProdutoCor
        },
      },
    });
  };
  


  export const listarProdutos = async () => {
    const produtos = await prisma.produto.findMany({
      include: {
        imagens: true,
        categoria: true, // Inclui a categoria no retorno
        cores: true, // Inclui as cores no retorno
      },
    });

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
    const { nome, preco, estoque, descricao, visibilidade, imagens, categoriaId, cores } = data;

    const updateData = {
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      descricao,
      visibilidade: visibilidade === 'true', // Certifique-se de que seja booleano
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
