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
    cores,
  } = data;

  const updateData = {
    nome,
    preco: isNaN(preco) ? undefined : parseFloat(preco),
    estoque: isNaN(estoque) ? undefined : parseInt(estoque),
    descricao,
    tituloInformacao,
    informacao,
    visibilidade: visibilidade === "true",
  };

  // Atualizar categoria
  if (categoriaId) {
    updateData.categoria = { connect: { id: parseInt(categoriaId) } };
  }

  // Atualizar cores
  if (cores && Array.isArray(cores)) {
    await prisma.produtoCor.deleteMany({ where: { produtoId } });
    await Promise.all(
      cores.map((corId) =>
        prisma.produtoCor.create({
          data: {
            produtoId,
            corId: parseInt(corId),
          },
        })
      )
    );
  }

  // Atualizar imagens
  if (imagens && imagens.length > 0) {
    const imagensNoBanco = await prisma.imagemProduto
      .findMany({
        where: { produtoId },
        select: { url: true },
      })
      .then((result) => result.map((img) => img.url));

    // Remover o prefixo 'http://localhost:3333/' das imagens atuais
    const imagensFormatadas = imagens.map((img) =>
      img.startsWith("http://localhost:3333/")
        ? img.replace("http://localhost:3333/", "")
        : img
    );

    // Diferenciar imagens
    const imagensParaManter = imagensFormatadas.filter((img) =>
      imagensNoBanco.includes(img)
    );
    const novasImagens = imagensFormatadas.filter(
      (img) => !imagensNoBanco.includes(img)
    );

    console.log("Imagens para manter:", imagensParaManter);
    console.log("Novas imagens para adicionar:", novasImagens);

    // Remove imagens que não estão na lista de manutenção
    await prisma.imagemProduto.deleteMany({
      where: { produtoId, url: { notIn: imagensParaManter } },
    });

    // Adicionar novas imagens
    if (novasImagens.length > 0) {
      await Promise.all(
        novasImagens.map(async (url) => {
          const novaImagem = await prisma.imagemProduto.create({
            data: {
              url,
              produtoId,
            },
          });
          console.log("Nova imagem vinculada:", novaImagem);
        })
      );
    }
  } else {
    // Caso nenhuma imagem seja enviada, remova todas as imagens associadas ao produto
    await prisma.imagemProduto.deleteMany({ where: { produtoId } });
  }

  // Atualizar os outros campos do produto
  const produtoAtualizado = await prisma.produto.update({
    where: { id: produtoId },
    data: updateData,
    include: {
      imagens: true,
      categoria: true,
      cores: { include: { cor: true } },
    },
  });

  console.log("Produto atualizado com imagens vinculadas:", produtoAtualizado);

  return produtoAtualizado;
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
      await prisma.produtoCor.deleteMany({
        where: { produtoId },
      });
    } else {
    }

    // 3. Exclua as imagens associadas ao produto
    const imagensAssociadas = await prisma.imagemProduto.findMany({
      where: { produtoId },
    });

    if (imagensAssociadas && imagensAssociadas.length > 0) {
      await prisma.imagemProduto.deleteMany({
        where: { produtoId },
      });
    } else {
    }

    // 4. Exclua os carrinhos que contêm esse produto
    const carrinhosAssociados = await prisma.carrinho.findMany({
      where: { produtoId },
    });

    if (carrinhosAssociados && carrinhosAssociados.length > 0) {
      await prisma.carrinho.deleteMany({
        where: { produtoId },
      });
    } else {
    }

    // 5. Exclua os itens de pedidos que contêm esse produto
    const pedidoItensAssociados = await prisma.pedidoItem.findMany({
      where: { produtoId },
    });

    if (pedidoItensAssociados && pedidoItensAssociados.length > 0) {
      await prisma.pedidoItem.deleteMany({
        where: { produtoId },
      });
    } else {
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
      await prisma.pedido.deleteMany({
        where: {
          itens: {
            every: { produtoId }, // Condição para excluir pedidos com apenas este produto
          },
        },
      });
    } else {
    }

    // 7. Finalmente, exclua o produto
    await prisma.produto.delete({
      where: { id: produtoId },
    });

    return { message: "Produto deletado com sucesso." };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw new Error(
      "Erro ao deletar produto. Por favor, tente novamente mais tarde."
    );
  }
};
