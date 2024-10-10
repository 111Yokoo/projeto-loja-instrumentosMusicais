import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token com a chave secreta
    req.user = decoded; // Coloca o payload do token no req.user
    next(); // Prossegue para a próxima função/middleware
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
};

export const verificarAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ error: "Permissão negada. Acesso somente para admins." });
  }
  next();
};
