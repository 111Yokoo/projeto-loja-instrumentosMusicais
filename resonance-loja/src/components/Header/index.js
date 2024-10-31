import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import Logo from "../../assets/images/Logo.png";
import { FaBars } from "react-icons/fa";
import "./styles.css";
import Sidebar from "../SideBar";

const Header = ({ cor }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logado, setLogado] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
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
                <li>
                  <Link to="/carrinho">
                    <FaCartArrowDown />
                  </Link>
                </li>
                <li className="tab">
                  <TbMinusVertical />
                </li>
                <li>
                  <Link to="/perfil">
                    <FaUser />
                  </Link>
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
