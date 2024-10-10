import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import "./styles.css"; // Certifique-se de ter estilos apropriados para o dropdown

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-metadeOne">
          <div className="navbar-brand">
            <a href="/">
              <h1>Logo</h1>
            </a>
          </div>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <button className="dropdown-button" onClick={toggleDropdown}>
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
              <Link to="/contato" className="navbar-link">Contato</Link>
            </li>
            <li className="navbar-item">
              <Link to="/sobrenos" className="navbar-link">Sobre Nós</Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-options">
          <a href="/carrinho">
            <li><FaCartArrowDown /></li>
          </a>
          <a href="/perfil">
            <li><FaUser /></li>
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
