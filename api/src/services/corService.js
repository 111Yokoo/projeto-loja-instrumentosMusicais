import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listarCores = async () => {
  return await prisma.cor.findMany();
};

export const criarCor = async (data) => {
  return await prisma.cor.create({
    data,
  });
};

export const obterCorPorId = async (id) => {
  return await prisma.cor.findUnique({
    where: { id: Number(id) },
  });
};

export const atualizarCor = async (id, data) => {
  return await prisma.cor.update({
    where: { id: Number(id) },
    data,
  });
};

export const deletarCor = async (id) => {
  return await prisma.cor.delete({
    where: { id: Number(id) },
  });
};
