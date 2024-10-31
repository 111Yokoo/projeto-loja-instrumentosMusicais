import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import './styles.css';

const Sidebar = ({ isOpen, toggleSidebar, logado }) => {
  const sidebarRef = useRef(null);

  // Função para lidar com cliques fora da sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar(false); // Fecha a sidebar se o clique for fora
    }
  };

  // Adiciona e remove o event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // O useEffect depende do estado isOpen

  const handleLinkClick = () => {
    toggleSidebar(false);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
      <ul className="sidebar-menu">
        <li>
          <span>Categorias:</span>
        </li>
        <li>
          <Link to="/acustico" className="sidebar-link" onClick={handleLinkClick}>
            Acústico
          </Link>
        </li>
        <li>
          <Link to="/semiacustico" className="sidebar-link" onClick={handleLinkClick}>
            Semiacústico
          </Link>
        </li>
        <li>
          <Link to="/eletrico" className="sidebar-link" onClick={handleLinkClick}>
            Elétrico
          </Link>
        </li>
        <hr />
        <li>
          <Link to="#contato" className="sidebar-link" onClick={handleLinkClick}>
            Contato
          </Link>
        </li>
        <li>
          <Link to="/sobrenos" className="sidebar-link" onClick={handleLinkClick}>
            Sobre Nós
          </Link>
        </li>
        <hr />
        <li>
          {logado ? (
            <>
              <Link to="/carrinho" className="sidebar-link" onClick={handleLinkClick}>
                <FaCartArrowDown />
              </Link>
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
        {logado && (
          <li>
            <Link to="/perfil" className="sidebar-link" onClick={handleLinkClick}>
              <FaUser />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
