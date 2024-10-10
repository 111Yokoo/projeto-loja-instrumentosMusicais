import {
  listarUsuarios,
  deletarUsuario,
  obterPerfil,
  atualizarPerfil,
  atualizarUsuario,
  atualizarFoto,
} from "../services/userService.js";

export const obterUsuarios = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const atualizarUsuarioController = async (req, res) => {
  const { userId } = req.params; // Pegando o ID da requisição

  const data = req.body;

  try {
    // Converta o userId para número inteiro antes de passar ao Prisma
    const usuarioAtualizado = await atualizarUsuario(parseInt(userId), data);

    res.status(200).json(usuarioAtualizado); // Retorna os dados atualizados
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarFotoController = async (req, res) => {
  const userId = req.user.userId; // Pega o ID do usuário autenticado
  const imagem = req.file ? req.file.path.replace(/\\/g, "/") : null; // Corrige as barras

  if (!imagem) {
    return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
  }

  try {
    // Salva apenas o caminho relativo da imagem no banco de dados
    const usuario = await atualizarFoto(userId, imagem);

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletarUsuarioController = async (req, res) => {
  const { userId } = req.params; // Pegando o ID da requisição

  try {
    // Converta o userId para número inteiro antes de passar ao Prisma
    await deletarUsuario(parseInt(userId));

    res.status(204).send(); // Usuário deletado com sucesso
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obterPerfilUsuario = async (req, res) => {
  const userId = req.user.userId; // Pega o ID do usuário autenticado

  try {
    const perfil = await obterPerfil(userId);
    res.status(200).json(perfil); // Retorna o perfil do usuário
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarPerfilUsuario = async (req, res) => {
  const userId = req.user.userId; // Pega o ID do usuário autenticado
  const data = req.body;

  try {
    const perfilAtualizado = await atualizarPerfil(userId, data);
    res.status(200).json(perfilAtualizado); // Retorna os dados atualizados
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
