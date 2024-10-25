import React, { useState } from "react";
import "../styles/criacao.css"; // Use o mesmo CSS se necessário
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa"; // Importando o ícone

export default function CriarCategorias() {
  const [logado, setLogado] = useState(false); // Estado de login
  const [nomeCategoria, setNomeCategoria] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o nome da categoria para o servidor
    console.log("Categoria criada:", nomeCategoria);
    setNomeCategoria(""); // Limpa o input após o envio
  };

  return (
    <div className="criacao">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Cadastro de Categoria</h2>
        </section>
        <section className="sessaoForms">
          {/* Ícone ou texto acima do formulário */}
          {logado ? (
            <span className="carrinho" onClick={() => {}}>
              <FaTrash />
            </span>
          ) : (
            <div>trash</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="infosCriacao">
              <article className="inputGroupCriacao">
                <div className="inputContainer">
                  <label>Nome da Categoria</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">📦</span>
                    <input
                      type="text"
                      name="nomeCategoria"
                      value={nomeCategoria}
                      onChange={(e) => setNomeCategoria(e.target.value)}
                      placeholder="Nome da Categoria"
                      required
                    />
                  </div>
                </div>
                <input type="submit" value="Criar Categoria" />
              </article>
            </div>
          </form>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
