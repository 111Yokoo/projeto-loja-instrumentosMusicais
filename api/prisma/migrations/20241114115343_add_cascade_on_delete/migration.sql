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
    "informacao" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("categoriaId", "descricao", "estoque", "id", "informacao", "nome", "preco", "tituloInformacao", "visibilidade") SELECT "categoriaId", "descricao", "estoque", "id", "informacao", "nome", "preco", "tituloInformacao", "visibilidade" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
