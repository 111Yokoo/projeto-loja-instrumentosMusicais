import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import Logo from "../../assets/images/Logo.png";
import { FaBars } from "react-icons/fa";
import "./styles.css";
import Sidebar from "../SideBar";
import { IoLogOut } from "react-icons/io5";
import api from "../../services/api";

const Header = ({ cor }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCriaçãoDropdownOpen, setIsCriaçãoDropdownOpen] = useState(false); // Estado para o dropdown "Criação"
  const [isListagemDropdownOpen, setIsListagemDropdownOpen] = useState(false); // Novo estado para o dropdown "Listagens"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();
  const [getCategorias, setGetCategorias] = useState([]); // Estado para armazenar as categorias
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { user, logout } = useContext(AuthContext);

  // Refs para gerenciar os dropdowns
  const dropdownRef = useRef(null);
  const criaçãoDropdownRef = useRef(null);
  const listagemDropdownRef = useRef(null);

  // Função para buscar as categorias
  const fetchCategorias = async () => {
    try {
      const isAdmin = user?.role === "ADMIN";
      const response = await api.get(`/categorias?admin=${isAdmin}`);
      setGetCategorias(response.data); // Armazena as categorias retornadas pela API
    } catch (error) {
      setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias(); // Chama a função para buscar as categorias
  }, [user?.role]);

  useEffect(() => {
    if (user) {
      setLogado(true);
    }
  }, [user]); // Adiciona `user` como dependência

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Funções para alternar entre os estados dos dropdowns
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsCriaçãoDropdownOpen(false); // Fechar o dropdown de "Criação"
    setIsListagemDropdownOpen(false); // Fechar o dropdown de "Listagens"
  };

  const toggleCriaçãoDropdown = () => {
    setIsCriaçãoDropdownOpen((prev) => !prev);
    setIsDropdownOpen(false); // Fechar o dropdown de "Categorias"
    setIsListagemDropdownOpen(false); // Fechar o dropdown de "Listagens"
  };

  const toggleListagemDropdown = () => {
    setIsListagemDropdownOpen((prev) => !prev);
    setIsDropdownOpen(false); // Fechar o dropdown de "Categorias"
    setIsCriaçãoDropdownOpen(false); // Fechar o dropdown de "Criação"
  };

  // Função para fechar os dropdowns ao clicar fora
  const handleClickOutside = (event) => {
    // Verificar se o clique ocorreu fora de qualquer dropdown
    if (
      !dropdownRef.current?.contains(event.target) &&
      !criaçãoDropdownRef.current?.contains(event.target) &&
      !listagemDropdownRef.current?.contains(event.target)
    ) {
      // Fechar todos os dropdowns se o clique for fora
      setIsDropdownOpen(false);
      setIsCriaçãoDropdownOpen(false);
      setIsListagemDropdownOpen(false);
    }
  };

  const handleLinkClick = (event) => {
    event.stopPropagation(); // Previne o fechamento do dropdown ao clicar em um link
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header style={cor ? { backgroundColor: cor } : {}} className={`header ${isScrolled ? "scrolled" : ""}`}>
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FaBars />
      </button>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img src={Logo} alt="Logo Resonance" />
          </Link>
        </div>
        <section className={`navbarItens ${isSidebarOpen ? "open" : ""}`}>
          <ul className="navbar-menu">
            {/* Dropdown de Categorias */}
            <li className="navbar-item" ref={dropdownRef}>
              <button className="dropdown-button link" onClick={toggleDropdown}>
                Categorias
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {loading ? (
                    <li className="dropdown-item">Carregando...</li>
                  ) : error ? (
                    <li className="dropdown-item">Erro ao carregar categorias</li>
                  ) : (
                    getCategorias.map((categoria) => (
                      <li key={categoria.id} className="dropdown-item">
                        <Link to={`/categoria/${categoria.id}`} className="dropdown-link" onClick={handleLinkClick}>
                          {categoria.nome}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </li>

            {/* Dropdown de Criação (visível apenas para admins) */}
            {user && user.role === "ADMIN" && (
              <li className="navbar-item" ref={criaçãoDropdownRef}>
                <button className="dropdown-button link" onClick={toggleCriaçãoDropdown}>
                  Criação
                </button>
                {isCriaçãoDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link to="/admin/criarCores" className="dropdown-link" onClick={handleLinkClick}>
                        Cor
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/admin/criarCategorias" className="dropdown-link" onClick={handleLinkClick}>
                        Categoria
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/admin/criarProdutos" className="dropdown-link" onClick={handleLinkClick}>
                        Produto
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Dropdown de Listagem (visível apenas para admins) */}
            {user && user.role === "ADMIN" && (
              <li className="navbar-item" ref={listagemDropdownRef}>
                <button className="dropdown-button link" onClick={toggleListagemDropdown}>
                  Listagens
                </button>
                {isListagemDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link to="/admin/listagemVendas" className="dropdown-link" onClick={handleLinkClick}>
                        Vendas
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/admin/usuarios" className="dropdown-link" onClick={handleLinkClick}>
                        Usuários
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Link para "Sobre Nós" */}
            <li className="navbar-item">
              <Link className="link" to="/sobrenos">Sobre Nós</Link>
            </li>
          </ul>

          <ul className="navbar-options">
            {logado ? (
              <>
                {user && user.role === "ADMIN" ? null : (
                  <>
                    <li>
                      <Link to="/carrinho">
                        <FaCartArrowDown />
                      </Link>
                    </li>
                    <li className="tab">
                      <TbMinusVertical />
                    </li>
                  </>
                )}
                <li>
                  <Link to="/perfil">
                    <FaUser />
                  </Link>
                </li>
                <li className="tab">
                  <TbMinusVertical />
                </li>
                <li>
                  <button className="linkLogout" onClick={handleLogout}>
                    <IoLogOut />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="linkCad" to="/registro">Cadastrar</Link>
                </li>
                <p>/</p>
                <li>
                  <Link className="linkCad" to="/login">Entrar</Link>
                </li>
              </>
            )}
          </ul>
        </section>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} logado={logado} />
      </nav>

      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}
    </header>
  );
};

export default Header;
