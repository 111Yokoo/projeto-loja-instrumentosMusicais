/*
  Warnings:

  - Added the required column `informacao` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tituloInformacao` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibilidade` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `Produto` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProdutoCor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "corId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "ProdutoCor_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutoCor_corId_fkey" FOREIGN KEY ("corId") REFERENCES "Cor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "hexadecimal" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProdutoCategoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "ProdutoCategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutoCategoria_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "estoque" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "tituloInformacao" TEXT NOT NULL,
    "visibilidade" BOOLEAN NOT NULL,
    "informacao" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("descricao", "estoque", "id", "nome", "preco") SELECT "descricao", "estoque", "id", "nome", "preco" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");
