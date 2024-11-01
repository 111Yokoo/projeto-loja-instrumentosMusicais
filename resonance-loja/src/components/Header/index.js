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

const Header = ({ cor }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCriaçãoDropdownOpen, setIsCriaçãoDropdownOpen] = useState(false); // Novo estado para o dropdown "Criação"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setLogado(true);
    }
  }, [user]); // Adicione `user` como dependência

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsCriaçãoDropdownOpen(false); // Fechar o dropdown de "Criação" ao abrir o outro
  };

  const toggleCriaçãoDropdown = () => {
    setIsCriaçãoDropdownOpen((prev) => !prev);
    setIsDropdownOpen(false); // Fechar o dropdown de "Categorias" ao abrir este
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setIsCriaçãoDropdownOpen(false); // Fechar ambos os dropdowns
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header style={cor ? { backgroundColor: cor } : {}} className={`header ${isScrolled ? "scrolled" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
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
            <li className="navbar-item" ref={dropdownRef}>
              <button className="dropdown-button link" onClick={toggleDropdown}>
                Categorias
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link to="/acustico" className="dropdown-link">Acústico</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/semiacustico" className="dropdown-link">Semiacústico</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/eletrico" className="dropdown-link">Elétrico</Link>
                  </li>
                </ul>
              )}
            </li>
            {user && user.role === "ADMIN" && (
              <li className="navbar-item" ref={dropdownRef}>
                <button className="dropdown-button link" onClick={toggleCriaçãoDropdown}>
                  Criação
                </button>
                {isCriaçãoDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link to="/admin/criarCores" className="dropdown-link">Cor</Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/admin/criarCategorias" className="dropdown-link">Categoria</Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/admin/criarProdutos" className="dropdown-link">Produto</Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <li className="navbar-item">
              <Link className="link" to="#contato">Contato</Link>
            </li>
            <li className="navbar-item">
              <Link className="link" to="/sobrenos">Sobre Nós</Link>
            </li>
          </ul>
          <ul className="navbar-options">
            {logado ? (
              <>
                {user && user.role === "ADMIN" ? <></> : (
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
                  <button className="linkLogout" to="#" onClick={handleLogout}>
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
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} logado={logado} />
      </nav>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
    </header>
  );
};

export default Header;
