import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FaCartArrowDown } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";
import './styles.css';
import api from "../../services/api";

const Sidebar = ({ isOpen, toggleSidebar, logado }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(""); // Estado para erros

  // Função para buscar as categorias
  const fetchCategorias = async () => {
    try {
      const isAdmin = user?.role === "ADMIN";
      const response = await api.get(`/categorias?admin=${isAdmin}`);
      setCategorias(response.data); // Armazena as categorias retornadas
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias(); // Busca as categorias quando o componente for montado
  }, [user?.role]); // Dependência para refazer a busca caso o papel do usuário mude

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar(false); // Fecha a sidebar se o clique for fora
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    toggleSidebar(false); // Fecha a sidebar ao clicar em um link
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
      <ul className="sidebar-menu">
        <div>
          <li>
            <span>Categorias:</span>
          </li>
          {loading ? (
            <li>Carregando categorias...</li> // Exibe um loading enquanto as categorias são carregadas
          ) : error ? (
            <li>{error}</li> // Exibe o erro, se houver
          ) : (
            // Renderiza as categorias dinamicamente
            categorias.map((categoria) => (
              <li key={categoria.id}>
                <Link to={`/produtos/${categoria.id}`} className="sidebar-link" onClick={handleLinkClick}>
                  {categoria.nome}
                </Link>
              </li>
            ))
          )}
        </div>
        <hr />
        {user && user.role === "ADMIN" && (
          <>
            <div>
              <li>
                <span>Criação:</span>
              </li>
              <li>
                <Link to="/admin/criarCores" className="sidebar-link" onClick={handleLinkClick}>
                  Cor
                </Link>
              </li>
              <li>
                <Link to="/admin/criarCategorias" className="sidebar-link" onClick={handleLinkClick}>
                  Categoria
                </Link>
              </li>
              <li>
                <Link to="/admin/criarProdutos" className="sidebar-link" onClick={handleLinkClick}>
                  Produto
                </Link>
              </li>
            </div>
            <hr />
            <div>
              <li>
                <span>Listagens:</span>
              </li>
              <li>
                <Link to="/admin/listagemVendas" className="sidebar-link" onClick={handleLinkClick}>
                  Vendas
                </Link>
              </li>
              <li>
                <Link to="/admin/usuarios" className="sidebar-link" onClick={handleLinkClick}>
                  Usuarios
                </Link>
              </li>
            </div>
            <hr />
          </>
        )}
        <div>
          <li>
            <Link to="/sobrenos" className="sidebar-link" onClick={handleLinkClick}>
              Sobre Nós
            </Link>
          </li>
        </div>
        <hr />
        <li>
          {logado ? (
            <>
              <div>
                {user && user.role !== "ADMIN" && (
                  <Link to="/carrinho" className="sidebar-link" onClick={handleLinkClick}>
                    <FaCartArrowDown />
                  </Link>
                )}
                  <Link to="/perfil" className="sidebar-link" onClick={handleLinkClick}>
                    <FaUser />
                  </Link>
                  <button className="linkLogout sidebar-link" to="#" onClick={handleLogout}>
                    <IoLogOut />
                  </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/registro" className="sidebar-link" onClick={handleLinkClick}>
                Cadastrar
              </Link>
              <Link to="/login" className="sidebar-link" onClick={handleLinkClick}>
                Entrar
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
