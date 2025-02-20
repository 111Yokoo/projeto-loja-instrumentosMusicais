import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Crie a senha hash para o administrador
  const hashedPassword = await bcrypt.hash("admin", 10);

  // Insira o administrador no banco de dados
  const admin = await prisma.user.upsert({
    where: { email: "admin" },
    update: {},
    create: {
      nome: "matheus",
      email: "admin@admin.com",
      telefone: "11899999999",
      password: hashedPassword,
      role: "ADMIN",
      cpf: "111111111111",
      endereco: {
        create: {
          cep: "12345-678",
          cidade: "São Paulo",
          bairro: "Centro",
          logradouro: "Rua do Admin",
          complemento: "Apto 1001",
          numero: "123",
        },
      },
      imagem: "https://example.com/admin.jpg",
    },
  });

  console.log("Admin user created:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
