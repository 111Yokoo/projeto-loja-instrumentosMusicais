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
  // Deletar vendas relacionadas ao usuário
  await prisma.venda.deleteMany({
    where: { userId },
  });

  // Deletar o endereço relacionado ao usuário
  await prisma.endereco.deleteMany({
    where: { userId },
  });

  // Agora, deletar o usuário
  return await prisma.user.delete({
    where: { id: userId },
  });
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
