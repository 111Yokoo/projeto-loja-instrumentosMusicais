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
      cores: {
        include: {
          cor: true, // Inclui as cores, incluindo o hexadecimal
        },
      },
    },
  });

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  // Formatar as imagens
  const imagensFormatadas = produto.imagens.map((imagem) => {
    return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
  });

  // Aqui, você garante que o hexadecimal seja retornado corretamente nas cores
  const coresFormatadas = produto.cores.map((produtoCor) => ({
    id: produtoCor.cor.id,
    nome: produtoCor.cor.nome,
    hexadecimal: produtoCor.cor.hexadecimal, // Garantindo que o hexadecimal da cor seja retornado
  }));

  return {
    ...produto,
    imagens: imagensFormatadas,
    cores: coresFormatadas, // Incluir as cores formatadas, incluindo o hexadecimal
  };
};

export const atualizarProduto = async (produtoId, data) => {
  const {
    nome,
    preco,
    estoque,
    descricao,
    visibilidade,
    tituloInformacao,
    informacao,
    imagens,
    categoriaId,
    cores, // cores é um array de IDs
  } = data;

  // Prepara os dados para atualização do produto
  const updateData = {
    nome,
    preco: parseFloat(preco),
    estoque: parseInt(estoque),
    descricao,
    tituloInformacao,
    informacao,
    visibilidade: visibilidade === "true", // Certifique-se de que seja booleano
  };

  // Se houver imagens, faz a atualização
  if (imagens) {
    updateData.imagens = {
      deleteMany: {}, // Deleta todas as imagens antigas do produto
      create: imagens.map((imagem) => ({ url: imagem })), // Cria as novas imagens
    };
  }

  // Se houver categoria, conecta ao produto
  if (categoriaId) {
    updateData.categoria = {
      connect: { id: parseInt(categoriaId) }, // Conecta à categoria
    };
  }

  // Atualiza as cores: apaga as antigas e associa as novas
  if (cores && Array.isArray(cores)) {
    // A lógica de exclusão das cores anteriores e inserção das novas
    updateData.cores = {
      deleteMany: {}, // Deleta todas as cores antigas associadas ao produto
      create: cores.map((corId) => ({ corId })) // Cria as novas relações com as cores enviadas
    };
  }

  // Atualiza o produto
  return await prisma.produto.update({
    where: { id: produtoId },
    data: updateData,
    include: {
      imagens: true,
      categoria: true,
      cores: true, // Inclui as cores no retorno
    },
  });
};
export const deletarProduto = async (produtoId) => {
  try {
    // Verifique se o produto existe
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produtoExistente) {
      throw new Error("Produto não encontrado.");
    }

    // 1. Desvincule o produto da categoria
    console.log(`Desvinculando produto ${produtoId} da categoria.`);
    await prisma.produto.update({
      where: { id: produtoId },
      data: {
        categoria: {
          disconnect: true, // Desvincula a categoria
        },
      },
    });

    // 2. Exclua todas as referências de ProdutoCor (associações de cores)
    const produtoCorAssociado = await prisma.produtoCor.findMany({
      where: { produtoId },
    });

    if (produtoCorAssociado && produtoCorAssociado.length > 0) {
      console.log(`Deletando ${produtoCorAssociado.length} associações de cor para o produto.`);
      await prisma.produtoCor.deleteMany({
        where: { produtoId },
      });
    } else {
      console.log('Nenhuma associação de cor encontrada para este produto.');
    }

    // 3. Exclua as imagens associadas ao produto
    const imagensAssociadas = await prisma.imagemProduto.findMany({
      where: { produtoId },
    });

    if (imagensAssociadas && imagensAssociadas.length > 0) {
      console.log(`Deletando ${imagensAssociadas.length} imagens associadas ao produto.`);
      await prisma.imagemProduto.deleteMany({
        where: { produtoId },
      });
    } else {
      console.log('Nenhuma imagem associada encontrada para este produto.');
    }

    // 4. Exclua os carrinhos que contêm esse produto
    const carrinhosAssociados = await prisma.carrinho.findMany({
      where: { produtoId },
    });

    if (carrinhosAssociados && carrinhosAssociados.length > 0) {
      console.log(`Deletando ${carrinhosAssociados.length} carrinhos que contêm este produto.`);
      await prisma.carrinho.deleteMany({
        where: { produtoId },
      });
    } else {
      console.log('Nenhum carrinho associado encontrado para este produto.');
    }

    // 5. Exclua os itens de pedidos que contêm esse produto
    const pedidoItensAssociados = await prisma.pedidoItem.findMany({
      where: { produtoId },
    });

    if (pedidoItensAssociados && pedidoItensAssociados.length > 0) {
      console.log(`Deletando ${pedidoItensAssociados.length} itens de pedidos associados ao produto.`);
      await prisma.pedidoItem.deleteMany({
        where: { produtoId },
      });
    } else {
      console.log('Nenhum item de pedido associado encontrado para este produto.');
    }

    // 6. Exclua os pedidos que contêm apenas este produto
    const pedidosComUnicoProduto = await prisma.pedido.findMany({
      where: {
        itens: {
          every: { produtoId }, // Verifica se todos os itens do pedido têm este produtoId
        },
      },
    });

    if (pedidosComUnicoProduto && pedidosComUnicoProduto.length > 0) {
      console.log(`Deletando ${pedidosComUnicoProduto.length} pedidos com apenas este produto.`);
      await prisma.pedido.deleteMany({
        where: {
          itens: {
            every: { produtoId }, // Condição para excluir pedidos com apenas este produto
          },
        },
      });
    } else {
      console.log('Nenhum pedido exclusivo associado encontrado para este produto.');
    }


    // 7. Finalmente, exclua o produto
    console.log(`Deletando produto com id ${produtoId}.`);
    await prisma.produto.delete({
      where: { id: produtoId },
    });

    console.log(`Produto ${produtoId} deletado com sucesso.`);
    return { message: 'Produto deletado com sucesso.' };

  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw new Error('Erro ao deletar produto. Por favor, tente novamente mais tarde.');
  }
};