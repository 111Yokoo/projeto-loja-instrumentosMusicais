import React, { useState, useRef } from "react";
import "../styles/listagemVendas.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import Compra from "../components/Compra";
import ModalCompra from "../components/ModalCompra";

export default function ListagemVendas() {
  const inputRef = useRef(null);
  const [selectedCompra, setSelectedCompra] = useState(null); 
  const handleCompraClick = (compra) => {
    setSelectedCompra(compra);
  };
  const handleCloseModal = () => {
    setSelectedCompra(null);
  };

  return (
    <div className="listagemVendas">
      <Header cor="#121212" />
      <main>
        <h2 className="titleHistoricoVendas">Histórico de Vendas</h2>
        <section className="searchContainer">
          <article className="inputGroup">
            <FaSearch />
            <input type="text" ref={inputRef} />
          </article>
        </section>
        <section className="container">
          <article className="vendasListagem">
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
        />)}
    </div>
  );
}
