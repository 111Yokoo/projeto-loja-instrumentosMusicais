import React, { useState, useRef } from "react";
import "../styles/usuarios.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import UsuarioCartao from "../components/UsuarioCartao";

export default function Usuarios() {
  const inputRef = useRef(null);

  return (
    <div className="usuarios">
      <Header cor="#121212" />
      <main>
        <h2 className="titleUsuarios">Usuário cadastrados</h2>
        <section className="searchContainer">
          <article className="inputGroup">
            <FaSearch />
            <input type="text" ref={inputRef} />
          </article>
        </section>
        <section className="container">
          <article className="usuariosListagem">
            <UsuarioCartao />
            <UsuarioCartao />
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
