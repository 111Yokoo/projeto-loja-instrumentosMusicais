import prisma from "./prismaClient.js";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// Função para criar um pedido a partir dos itens do carrinho
export const criarPedido = async (userId, metodoPagamento) => {
  // Busca o endereço do usuário
  const usuario = await prisma.user.findUnique({
    where: { id: userId },
    include: { endereco: true },
  });

  if (!usuario || !usuario.endereco) {
    throw new Error("Endereço não encontrado para o usuário.");
  }

  const enderecoEntrega = `${usuario.endereco.logradouro}, ${usuario.endereco.numero}, ${usuario.endereco.bairro}, ${usuario.endereco.cidade}, CEP: ${usuario.endereco.cep}`;

  // Busca todos os itens do carrinho do usuário
  const itensCarrinho = await prisma.carrinho.findMany({
    where: { userId: userId },
    include: { produto: true },
  });

  if (!itensCarrinho || itensCarrinho.length === 0) {
    throw new Error("O carrinho está vazio.");
  }

  // Calcula o total do pedido
  const total = itensCarrinho.reduce((acc, item) => {
    return acc + item.quantidade * item.produto.preco;
  }, 0);

  // Cria o pedido
  const pedido = await prisma.pedido.create({
    data: {
      userId: userId,
      total: total,
      metodoPagamento: metodoPagamento,
      enderecoEntrega: enderecoEntrega,
      itens: {
        create: itensCarrinho.map((item) => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          preco: item.produto.preco,
        })),
      },
    },
  });

  // Atualiza o estoque dos produtos
  for (const item of itensCarrinho) {
    await prisma.produto.update({
      where: { id: item.produtoId },
      data: {
        estoque: item.produto.estoque - item.quantidade, // Diminui o estoque
      },
    });
  }

  // Limpa o carrinho do usuário
  await prisma.carrinho.deleteMany({
    where: { userId: userId },
  });

  return pedido;
};

// Função para listar todos os pedidos do usuário autenticado (usuário comum)
export const listarPedidos = async (userId) => {
  return await prisma.pedido.findMany({
    where: { userId: userId },
    include: {
      itens: {
        include: {
          produto: true, // Inclui os detalhes dos produtos no pedido
        },
      },
    },
  });
};

// Função para listar todas as vendas (apenas para administradores)
export const listarVendas = async () => {
  const vendas = await prisma.pedido.findMany({
    include: {
      itens: {
        include: {
          produto: {
            include: {
              imagens: true,
            },
          },
        },
      },
      user: {
        include: {
          endereco: true, // Inclui o endereço completo do usuário
        },
      },
    },
  });

  // Formata a resposta no formato desejado
  const vendasFormatadas = vendas.map((venda) => {
    // Formata os itens do pedido
    const itensFormatados = venda.itens.map((item) => {
      // Formata as imagens do produto
      const imagensFormatadas = item.produto.imagens.map((imagem) => {
        return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
      });

      return {
        id: item.id,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        preco: item.preco,
        pedidoId: item.pedidoId,
        produto: {
          id: item.produto.id,
          nome: item.produto.nome,
          preco: item.produto.preco,
          estoque: item.produto.estoque,
          descricao: item.produto.descricao,
          imagens: imagensFormatadas, // Adiciona as URLs das imagens formatadas
        },
      };
    });

    return {
      id: venda.id,
      userId: venda.userId,
      total: venda.total,
      metodoPagamento: venda.metodoPagamento,
      data: venda.data,
      itens: itensFormatados,
      user: {
        id: venda.user.id,
        nome: venda.user.nome,
        email: venda.user.email,
        telefone: venda.user.telefone,
        cpf: venda.user.cpf,
        endereco: {
          cep: venda.user.endereco.cep,
          cidade: venda.user.endereco.cidade,
          bairro: venda.user.endereco.bairro,
          logradouro: venda.user.endereco.logradouro,
          complemento: venda.user.endereco.complemento,
          numero: venda.user.endereco.numero,
        },
      },
    };
  });

  return vendasFormatadas;
};
