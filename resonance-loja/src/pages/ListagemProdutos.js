import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/listagemProdutos.css";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Produto from "../components/Produto";
import { FaSearch } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosPricetags } from "react-icons/io";
import { IoMdColorFill } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListagemProdutos() {
  const inputRef = useRef(null);
  const { id } = useParams();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null); // Armazena o ID da cor
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cores, setCores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const navigate = useNavigate();

  const handlePriceChange = (value) => {
    setSelectedPrice((prev) => (prev === value ? null : value));
  };

  const handleColorChange = (colorId) => {
    setSelectedColorId((prev) => (prev === colorId ? null : colorId)); // Alterna o ID da cor
  };

  const clearFilters = () => {
    setSelectedPrice(null);
    setSelectedColorId(null);
    setSearchTerm("");
  };

  useEffect(() => {
    const fetchCores = async () => {
      try {
        const response = await api.get(`/cores`);
        setCores(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar cores.");
        setLoading(false);
      }
    };
    fetchCores();
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const isAdmin = user?.role === "ADMIN";
        const response = await api.get(`/produtos?admin=${isAdmin}`);
        setProdutos(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar produtos.");
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [user?.role]);

  useEffect(() => {
    const produtosFiltrados = produtos.filter((produto) => {
      const isCategoriaMatch = parseInt(produto.categoriaId) === parseInt(id);
      const isNomeMatch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase());

      let isPriceMatch = true;
      if (selectedPrice === "Abaixo de R$7000.00") {
        isPriceMatch = produto.preco < 7000;
      } else if (selectedPrice === "De R$7001.00 a R$13000.00") {
        isPriceMatch = produto.preco >= 7001 && produto.preco <= 13000;
      } else if (selectedPrice === "Acima de R$13000.00") {
        isPriceMatch = produto.preco > 13000;
      }

      const isColorMatch = selectedColorId ? produto.cores.some((cor) => cor.id === selectedColorId) : true;

      return isCategoriaMatch && isNomeMatch && isPriceMatch && isColorMatch;
    });

    setProdutosFiltrados(produtosFiltrados);
  }, [id, produtos, searchTerm, selectedPrice, selectedColorId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const navigateToCreateProduct = () => {
    navigate(`/admin/criarProdutos`);
  };

  return (
    <div className="listagemProdutos">
      <Header cor="#121212" />
      <main>
        <section className="searchContainer">
          <div className="searchadd">
            <article className="inputGroup">
              <FaSearch />
              <input
                type="text"
                ref={inputRef}
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Pesquisar produtos..."
              />
            </article>
            {user?.role === "ADMIN" && (
              <button className="buttonadd" onClick={navigateToCreateProduct}>
                <FaPlus className="addproduto" />
              </button>
            )}
          </div>
        </section>
        <section className="container">
          <article className="filter">
            <aside className="titleFilter clear">
              <span>
                <HiAdjustmentsHorizontal /> Filtros:
              </span>
               <button className="clearFiltersButton" onClick={clearFilters}>Limpar Filtros</button>
            </aside>

            <hr />
            <aside className="precoFiltro">
              <div className="titleFilter">
                <IoIosPricetags /> Preços:
              </div>
              <div className="formCheckbox">
                <div>
                  <input
                    type="checkbox"
                    id="checkOne"
                    checked={selectedPrice === "Abaixo de R$7000.00"}
                    onChange={() => handlePriceChange("Abaixo de R$7000.00")}
                  />
                  <label htmlFor="checkOne">Abaixo de R$7000.00</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="checkTwo"
                    checked={selectedPrice === "De R$7001.00 a R$13000.00"}
                    onChange={() => handlePriceChange("De R$7001.00 a R$13000.00")}
                  />
                  <label htmlFor="checkTwo">De R$7001.00 a R$13000.00</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="checkThree"
                    checked={selectedPrice === "Acima de R$13000.00"}
                    onChange={() => handlePriceChange("Acima de R$13000.00")}
                  />
                  <label htmlFor="checkThree">Acima de R$13000.00</label>
                </div>
              </div>
            </aside>
            <hr />
            <aside className="precoFiltro">
              <div className="titleFilter">
                <IoMdColorFill /> Cor:
              </div>
              <div className="formColor">
                {cores.map((cor) => (
                  <div
                    key={cor.id}
                    className={`colorFilter ${selectedColorId === cor.id ? "selected" : ""}`}
                    onClick={() => handleColorChange(cor.id)}
                    style={{ background: `#${cor.hexadecimal}` }}
                  ></div>
                ))}
              </div>
            </aside>
            <hr />
          </article>
          <article className="produtosListagem">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <Produto key={produto.id} Produto={produto} />
              ))
            ) : (
              <p>Nenhum produto encontrado para esta categoria.</p>
            )}
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
