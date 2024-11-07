import prisma from "./prismaClient.js";
import bcrypt from "bcrypt";

export const listarUsuarios = async () => {
  return await prisma.user.findMany({
    include: {
      endereco: true, // Inclui os detalhes do endereço do usuário
    },
  });
};

export const atualizarUsuario = async (userId, data) => {
  const {
    nome,
    email,
    telefone,
    password,
    role,
    cpf,
    cep,
    cidade,
    bairro,
    logradouro,
    complemento,
    numero,
    imagem,
  } = data;

  // Verifique se o email já está sendo usado por outro usuário
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error("O email já está em uso por outro usuário.");
  }

  // Atualizar as informações do usuário e do endereço
  return await prisma.user.update({
    where: { id: userId }, // O ID do usuário deve ser um inteiro
    data: {
      nome,
      email,
      telefone,
      password, // Certifique-se de que o hash da senha é tratado anteriormente se necessário
      role,
      cpf,
      imagem,
      endereco: {
        update: {
          cep,
          cidade,
          bairro,
          logradouro,
          complemento,
          numero,
        },
      },
    },
  });
};

export const deletarUsuario = async (userId) => {
  try {
    // 1. Deletar os itens no carrinho do usuário
    await prisma.carrinho.deleteMany({
      where: { userId },
    });

    // 2. Deletar os pedidos relacionados ao usuário, incluindo os itens de pedido
    await prisma.pedidoItem.deleteMany({
      where: { pedido: { userId } },  // Deleta todos os itens de pedidos do usuário
    });
    
    await prisma.pedido.deleteMany({
      where: { userId },  // Deleta todos os pedidos do usuário
    });

    // 3. Deletar o endereço relacionado ao usuário
    await prisma.endereco.delete({
      where: { userId },  // Deleta o único endereço do usuário
    });

    // 4. Finalmente, deletar o usuário
    await prisma.user.delete({
      where: { id: userId },  // Deleta o usuário
    });

    return { message: "Usuário e todos os dados relacionados deletados com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw new Error("Erro ao deletar usuário");
  }
};


export const obterPerfil = async (userId) => {
  const usuario = await prisma.user.findUnique({
    where: { id: userId },
    include: { endereco: true }, // Incluir as informações do endereço, se necessário
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  // Formata a URL da imagem
  const baseUrl = process.env.BASE_URL;
  const imagemFormatada = usuario.imagem
    ? `${baseUrl}/${usuario.imagem.replace(/\\/g, "/")}`
    : null;

  return {
    ...usuario,
    imagem: imagemFormatada, // Retorna a URL completa da imagem
  };
};

export const atualizarPerfil = async (userId, data) => {
  const {
    nome,
    email,
    telefone,
    password,
    role,
    cpf,
    cep,
    cidade,
    bairro,
    logradouro,
    complemento,
    numero,
    imagem,
  } = data;

  // Verifica se o usuário tem um endereço existente
  const usuario = await prisma.user.findUnique({
    where: { id: userId },
    include: { endereco: true },
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  const enderecoData = {
    cep,
    cidade,
    bairro,
    logradouro,
    complemento,
    numero,
  };

  let enderecoUpdate = {};

  // Se o usuário já tem um endereço, fazemos um update. Caso contrário, criamos o endereço.
  if (usuario.endereco) {
    enderecoUpdate = {
      update: enderecoData,
    };
  } else {
    enderecoUpdate = {
      create: enderecoData,
    };
  }

  let updateData = {
    nome,
    email,
    telefone,
    role,
    cpf,
    imagem,
    endereco: enderecoUpdate, // Atualiza ou cria o endereço
  };

  // Se a senha foi fornecida, ela deve ser hashada
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    updateData.password = hashedPassword;
  }

  // Atualiza o perfil do usuário
  return await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

export const atualizarFoto = async (userId, imagem) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      imagem: imagem,
    },
  });
};
