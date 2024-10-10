import prisma from "./prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validRoles = ["ADMIN", "USER"];

export const registrarUsuario = async (data) => {
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
  } = data;

  // Verifica se o role é válido
  if (!validRoles.includes(role)) {
    throw new Error("O tipo de usuário deve ser ADMIN ou USER.");
  }

  // Hash da senha antes de salvar no banco de dados
  const hash = await bcrypt.hash(password, 10);

  // Cria o usuário no banco
  return await prisma.user.create({
    data: {
      nome,
      email,
      telefone,
      password: hash,
      role,
      cpf,
      endereco: {
        create: {
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

export const autenticarUsuario = async (email, password) => {
  // Busca o usuário pelo email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado.");

  // Comparar a senha fornecida com o hash armazenado
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Senha incorreta.");

  // Gera um token JWT ou retorna os dados do usuário
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return { token, user };
};
