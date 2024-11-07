import React, { useState } from "react";
import "./styles.css";
import { FaTrash, FaPencilAlt, FaCheck } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import api from "../../services/api";  // Importando a instância da API

const UsuarioCartao = ({ id, nome, email, senha, setUsuarios, usuarios }) => {
  const [isEditable, setIsEditable] = useState(false);  // Controle do estado de edição
  const [userInfo, setUserInfo] = useState({ nome, email, senha });

  // Função para alternar entre modo de edição e salvar as mudanças na API
  const toggleEdit = () => {
    if (isEditable) {
      // Se estiver no modo de edição, salva as mudanças na API
      handleUpdate({ id, ...userInfo });
    }
    setIsEditable(!isEditable);  // Alterna entre editar e visualizar
  };

  // Função para lidar com as mudanças nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Função para atualizar os dados de um usuário na API
  const handleUpdate = async (updatedUserInfo) => {
    try {
      const response = await api.put(`/users/${updatedUserInfo.id}`, updatedUserInfo);
      userInfo.senha = "";
      setUsuarios(usuarios.map((user) =>
        user.id === updatedUserInfo.id ? { ...user, ...updatedUserInfo } : user
      ));
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  // Função para excluir um usuário
  const handleDelete = async () => {
    try {
      await api.delete(`/users/${id}`);  // Certifique-se de que o endpoint está correto
      setUsuarios(usuarios.filter(user => user.id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <section className="usuarioCartao">
      <article className="CabecalhoUser">
        <aside><FaRegUserCircle /></aside>
        <aside className="buttonGroup">
          <button className="buttonUsers" onClick={toggleEdit}>
            {isEditable ? <FaCheck /> : <FaPencilAlt />}
          </button>
          <button className="buttonUsers" onClick={handleDelete}>
            <FaTrash />
          </button>
        </aside>
      </article>

      <article>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={userInfo.nome}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </label>
      </article>

      <article>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </label>
      </article>

      <article>
        <label>
          Senha:
          <input
            type="text"
            name="senha"
            value={userInfo.senha}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </label>
      </article>
    </section>
  );
};

export default UsuarioCartao;
