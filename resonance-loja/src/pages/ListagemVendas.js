import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/listagemVendas.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import Compra from "../components/Compra";
import ModalCompra from "../components/ModalCompra";
import api from "../services/api";

export default function ListagemVendas() {
  const inputRef = useRef(null);
  const [vendas, setVendas] = useState([]); // Estado para armazenar as vendas
  const [filteredVendas, setFilteredVendas] = useState([]); // Estado para armazenar vendas filtradas
  const [selectedCompra, setSelectedCompra] = useState(null);
  const { user, logout } = useContext(AuthContext);

  // Função para carregar as vendas quando o usuário está logado
  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await api.get(`/vendas`); // Rota da API para buscar as vendas
        setVendas(response.data); // Armazena as vendas no estado
        setFilteredVendas(response.data); // Inicializa vendas filtradas
      } catch (error) {
        console.error("Erro ao buscar compras:", error);
      }
    };

    if (user) {
      fetchVendas();
    } else {
      setVendas([]);
      setFilteredVendas([]);
    }
  }, [user]);

  const handleCompraClick = (compra) => {
    setSelectedCompra(compra);
  };

  const handleCloseModal = () => {
    setSelectedCompra(null);
  };

  const handleSearch = () => {
    const searchTerm = inputRef.current.value.toLowerCase();
    const filtered = vendas.filter((compra) =>
      compra.user?.nome?.toLowerCase().includes(searchTerm)
    );
    setFilteredVendas(filtered);
  };

  return (
    <div className="listagemVendas">
      <Header cor="#121212" />
      <main>
        <h2 className="titleHistoricoVendas">Histórico de Vendas</h2>
        <section className="searchContainer">
          <article className="inputGroup">
            <FaSearch />
            <input
              type="text"
              ref={inputRef}
              placeholder="Pesquisar por nome de usuário"
              onChange={handleSearch}
            />
          </article>
        </section>
        <section className="container">
          <article className="vendasListagem">
            {/* Renderiza todos os pedidos */}
            {filteredVendas.map((compra) => (
              <Compra
                key={compra.idCompra} // Supondo que idCompra seja único
                preco={compra.total}
                nomeUsuario={compra.user.nome}
                data={compra.data}
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
