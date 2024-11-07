import React, { useState, useRef, useEffect } from "react";
import "../styles/usuarios.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import UsuarioCartao from "../components/UsuarioCartao";
import api from "../services/api";  // Adicionando a instância da API

export default function Usuarios() {
  const inputRef = useRef(null);
  const [usuarios, setUsuarios] = useState([]);  // Estado para armazenar os usuários
  const [filteredUsuarios, setFilteredUsuarios] = useState([]); // Estado para armazenar os usuários filtrados
  const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento
  const [error, setError] = useState("");  // Estado para controlar possíveis erros
  const [searchTerm, setSearchTerm] = useState("");  // Estado para armazenar o termo de busca

  // Função para buscar usuários da API
  const fetchUsuarios = async () => {
    try {
      const response = await api.get("/users");  // Supondo que a rota seja "/usuarios"
      setUsuarios(response.data);  // Armazenando os dados dos usuários
      setFilteredUsuarios(response.data); // Inicialmente, exibe todos os usuários
    } catch (err) {
      setError("Erro ao carregar os usuários.");
    } finally {
      setLoading(false);  // Finaliza o carregamento
    }
  };

  // Função para lidar com a mudança no input de busca
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);  // Atualiza o termo de busca

    // Filtra os usuários de acordo com o nome
    if (searchValue) {
      const filtered = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(searchValue.toLowerCase()) // Case insensitive
      );
      setFilteredUsuarios(filtered);
    } else {
      setFilteredUsuarios(usuarios);  // Se o campo de busca estiver vazio, exibe todos os usuários
    }
  };

  // UseEffect para buscar os usuários ao carregar o componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios">
      <Header cor="#121212" />
      <main>
        <h2 className="titleUsuarios">Usuários cadastrados</h2>
        
        {/* Se houver um erro, mostra a mensagem de erro */}
        {error && <p className="error">{error}</p>}
        
        <section className="searchContainer">
          <article className="inputGroup">
            <FaSearch />
            <input
              type="text"
              ref={inputRef}
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar usuário..."
            />
          </article>
        </section>

        {/* Exibe "Carregando..." enquanto os dados não são carregados */}
        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <section className="container">
            <article className="usuariosListagem">
              {/* Mapeia os usuários filtrados e passa os dados para o UsuarioCartao */}
              {filteredUsuarios.length > 0 ? (
                filteredUsuarios.map((usuario) => (
                  <UsuarioCartao
                    key={usuario.id}  // Supondo que o id do usuário seja único
                    id={usuario.id}    // Passando o id também
                    nome={usuario.nome}
                    email={usuario.email}
                    senha={usuario.senha}  // Passando os dados para o componente
                    setUsuarios={setUsuarios}  // Função para atualizar a lista
                    usuarios={usuarios}  // Passando a lista de usuários para o filho
                  />
                ))
              ) : (
                <p>Nenhum usuário encontrado.</p>
              )}
            </article>
          </section>
        )}
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
