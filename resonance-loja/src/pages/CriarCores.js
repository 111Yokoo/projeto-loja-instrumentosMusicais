import React, { useState } from "react";
import "../styles/criacao.css"; // Use o mesmo CSS se necessário
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa"; // Importando o ícone

export default function CriarCores() {
  const [logado, setLogado] = useState(false); // Estado de login
  const [nomeCor, setNomeCor] = useState("");
  const [codigoHex, setCodigoHex] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o nome e código da cor para o servidor
    console.log("Cor criada:", nomeCor, codigoHex);
    setNomeCor(""); // Limpa o input após o envio
    setCodigoHex(""); // Limpa o input após o envio
  };

  return (
    <div className="criacao">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Cadastro de Cor</h2>
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
                  <label>Nome da Cor</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🎨</span>
                    <input
                      type="text"
                      name="nomeCor"
                      value={nomeCor}
                      onChange={(e) => setNomeCor(e.target.value)}
                      placeholder="Nome da Cor"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Código Hexadecimal</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">#</span>
                    <input
                      type="text"
                      name="codigoHex"
                      value={codigoHex}
                      onChange={(e) => setCodigoHex(e.target.value)}
                      placeholder="Código Hexadecimal"
                      required
                    />
                  </div>
                </div>
                <input type="submit" value="Criar Cor" />
              </article>
            </div>
          </form>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
