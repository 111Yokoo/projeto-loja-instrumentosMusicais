import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Necessário para trabalhar com import.meta.url
import authRoutes from "./routes/authRoutes.js";
import carrinhoRoutes from "./routes/carrinhoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Carrega as variáveis de ambiente a partir do arquivo .env
dotenv.config();

// Inicializa o app Express
const app = express();

// Alternativa para obter __dirname no ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Serve a pasta 'uploads' como estática
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rotas
app.use(authRoutes);
app.use(carrinhoRoutes);
app.use(pedidoRoutes);
app.use(produtoRoutes);
app.use(userRoutes);

// Rota raiz para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.send("API Rodando!");
});

// Porta na qual o servidor irá rodar
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
