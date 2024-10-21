import React, { useState } from "react";
import "../styles/perfil.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Compra from "../components/Compra";
import ModalCompra from "../components/ModalCompra"; 

export default function Perfil() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const handleCompraClick = (compra) => {
    setSelectedCompra(compra);
  };
  const handleCloseModal = () => {
    setSelectedCompra(null);
  };

  return (
    <div className="perfil">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Minha conta</h2>
          <button>Deslogar</button>
        </section>
        <section className="infoConta">
          <h2>Informações da conta</h2>
          <article className="infoEdit">
            <label>
              Nome
              <input type="text" value="nome" disabled={!isEditable} />
            </label>
            <label>
              Email
              <input type="text" value="email" disabled={!isEditable} />
            </label>
            <label>
              Senha
              <div className="inputPasswordPerfil">
                <input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  value="senha"
                  disabled={!isEditable}
                />
                <button
                  type="button"
                  className="buttonSenhaLogin"
                  onClick={togglePasswordVisibility}
                  disabled={!isEditable}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </label>
            <label>
              Telefone
              <input type="text" value="Telefone" disabled={!isEditable} />
            </label>
            <label>
              CPF
              <input type="text" value="CPF" disabled={!isEditable} />
            </label>
            <label>
              CEP
              <input type="text" value="CEP" disabled={!isEditable} />
            </label>
            <label>
              Cidade
              <input type="text" value="Cidade" disabled={!isEditable} />
            </label>
            <label>
              Bairro
              <input type="text" value="Bairro" disabled={!isEditable} />
            </label>
            <label>
              Logradouro
              <input type="text" value="Logradouro" disabled={!isEditable} />
            </label>
            <label>
              Complemento
              <input type="text" value="Complemento" disabled={!isEditable} />
            </label>
            <label>
              Número
              <input type="text" value="Número" disabled={!isEditable} />
            </label>
            <button className="buttonPerfilEdit" onClick={toggleEditMode}>
              <strong>{isEditable ? "Salvar" : "Editar informações"}</strong>
            </button>
          </article>
        </section>
        <hr />
        <section className="compras">
          <h2>Histórico de compras</h2>
          <article className="historicoCompras">
            <Compra preco="100" nomeUsuario="Fulano" onClick={() => handleCompraClick({ idCompra: "idCompra", imagem: "imagem", nomes: "nomes", precos: "preços", valorTotal: "valoTotal" })} />
            <Compra preco="200" nomeUsuario="Beltrano" onClick={() => handleCompraClick({ idCompra: "idCompra", imagem: "imagem", nomes: "nomes", precos: "preços", valorTotal: "valoTotal" })} />
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />

      {selectedCompra && (
        <ModalCompra
          compra={selectedCompra}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
