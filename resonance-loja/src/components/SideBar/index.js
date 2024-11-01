import React, { useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FaCartArrowDown } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import './styles.css';
import { IoLogOut } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSidebar, logado }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

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
    toggleSidebar(false);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
      <ul className="sidebar-menu">
        <div>
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
          </>
        )}
        <div>
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
        </div>
        <hr />
        <li>
          {logado ? (
            <>
              <div>
                {user && user.role ? <></> : <Link to="/carrinho" className="sidebar-link" onClick={handleLinkClick}>
                  <FaCartArrowDown />
                </Link>}
                <li>
                  <Link to="/perfil" className="sidebar-link" onClick={handleLinkClick}>
                    <FaUser />
                  </Link>
                </li>
                <li>
                  <button className="linkLogout sidebar-link" to="#" onClick={handleLogout}>
                    <IoLogOut />
                  </button>
                </li>
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
