
import { registrarUsuario, autenticarUsuario } from '../services/authService.js';

export const registro = async (req, res) => {
  const { nome, email, telefone, password, role, cpf, cep, cidade, bairro, logradouro, complemento, numero } = req.body;

  try {
    // Verifica se o role é válido
    if (!['ADMIN', 'USER'].includes(role)) {
      return res.status(400).json({ error: 'O tipo de usuário deve ser ADMIN ou USER.' });
    }

    const user = await registrarUsuario({
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
    });

    return res.status(201).json(user); // Retorna o usuário criado
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao registrar o usuário.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await autenticarUsuario(email, password);
    return res.json({ token, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
