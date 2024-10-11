import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import Logo from "../../assets/images/Logo.png";
import "./styles.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logado, setLogado] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Adiciona o manipulador de eventos de clique
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove o manipulador de eventos ao desmontar o componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <div className="navbar-metadeOne">
          <div className="navbar-brand">
            <Link to="/">
              <img src={Logo} />
            </Link>
          </div>
          <ul className="navbar-menu">
            <li className="navbar-item" ref={dropdownRef}>
              <button className="dropdown-button link" onClick={toggleDropdown}>
                Categorias
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <a href="/acustico" className="dropdown-link">Acústico</a>
                  </li>
                  <li className="dropdown-item">
                    <a href="/semiacustico" className="dropdown-link">Semiacústico</a>
                  </li>
                  <li className="dropdown-item">
                    <a href="/eletrico" className="dropdown-link">Elétrico</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="navbar-item">
              <a className="link" href="/contato">Contato</a>
            </li>
            <li className="navbar-item">
              <a className="link" href="/sobrenos">Sobre Nós</a>
            </li>
          </ul>
        </div>
        <ul className="navbar-options">
          {logado ?
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
            :
            <>
              <li>
                <Link className="linkCad" to="/registro">
                  Cadastrar
                </Link>
              </li>
              <p>/</p>
              <li>
                <Link className="linkCad" to="/login">
                  Entrar
                </Link>
              </li>
            </>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
