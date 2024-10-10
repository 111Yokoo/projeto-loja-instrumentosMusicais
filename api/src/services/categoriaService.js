import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listarCategorias = async () => {
  return await prisma.categoria.findMany();
};

export const criarCategoria = async (data) => {
  return await prisma.categoria.create({
    data,
  });
};

export const obterCategoriaPorId = async (id) => {
  return await prisma.categoria.findUnique({
    where: { id: Number(id) },
  });
};

export const atualizarCategoria = async (id, data) => {
  return await prisma.categoria.update({
    where: { id: Number(id) },
    data,
  });
};

export const deletarCategoria = async (id) => {
  return await prisma.categoria.delete({
    where: { id: Number(id) },
  });
};
