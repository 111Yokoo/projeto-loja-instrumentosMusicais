import React, { useState, useEffect, useRef } from "react";
import "../styles/listagemVendas.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import Compra from "../components/Compra";
import ModalCompra from "../components/ModalCompra";

export default function ListagemVendas() {
  const inputRef = useRef(null);
  const [vendas, setVendas] = useState([]);  // Estado para armazenar as vendas
  const [selectedCompra, setSelectedCompra] = useState(null);
  
  // Função para carregar as vendas da API
  const loadVendas = async () => {
    try {
      const response = await fetch("SUA_API_URL_AQUI");  // Substitua pela URL da sua API
      if (response.ok) {
        const data = await response.json();
        setVendas(data);  // Supondo que a resposta da API seja um array de vendas
      } else {
        console.error("Erro ao carregar vendas:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar as vendas:", error);
    }
  };

  // Carregar as vendas quando o componente for montado
  useEffect(() => {
    loadVendas();
  }, []);  // O array vazio significa que isso será executado uma única vez, quando o componente for montado

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
            {/* Renderiza as compras vindas da API */}
            {vendas.map((compra) => (
              <Compra
                key={compra.idCompra}  // Supondo que idCompra seja único
                preco={compra.valorTotal}
                nomeUsuario={compra.nomes}
                onClick={() => handleCompraClick(compra)}
              />
            ))}
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
