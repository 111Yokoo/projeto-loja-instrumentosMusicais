import React, { useState, useRef } from "react";
import "../styles/listagemProdutos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Produto from "../components/Produto";
import { FaSearch } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosPricetags } from "react-icons/io";
import { IoMdColorFill } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

export default function ListagemProdutos() {
  const inputRef = useRef(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handlePriceChange = (value) => {
    // Se o valor clicado for o mesmo que o selecionado, desmarque-
    setSelectedPrice(prev => (prev === value ? null : value));
  };

  return (
    <div className="listagemProdutos">
      <Header cor="#121212" />
      <main>
        <section className="searchContainer">
          <div className="searchadd">
            <article className="inputGroup">
              <FaSearch />
              <input type="text" ref={inputRef} />
            </article>
            <button className="buttonadd">
              <FaPlus className="addproduto"/>
            </button>
          </div>
        </section>
        <section className="container">
          <article className="filter">
            <aside className="titleFilter">
              <HiAdjustmentsHorizontal /> Filtros:
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
                    checked={selectedPrice === "Abaixo de R$2000.00"}
                    onChange={() => handlePriceChange("Abaixo de R$2000.00")}
                  />
                  <label htmlFor="checkOne">Abaixo de R$2000.00</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="checkTwo"
                    checked={selectedPrice === "De R$2001.00 a R$4000.00"}
                    onChange={() => handlePriceChange("De R$2001.00 a R$4000.00")}
                  />
                  <label htmlFor="checkTwo">De R$2001.00 a R$4000.00</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="checkThree"
                    checked={selectedPrice === "Acima de R$4001.00"}
                    onChange={() => handlePriceChange("Acima de R$4001.00")}
                  />
                  <label htmlFor="checkThree">Acima de R$4001.00</label>
                </div>
              </div>
            </aside>
            <hr />
            <aside className="precoFiltro">
              <div className="titleFilter">
                <IoMdColorFill /> Cor:
              </div>
              <div className="formColor">
                <div
                  className="colorFilter"
                  onClick={() => {}}
                  style={{ background: "#000" }}
                ></div>
              </div>
            </aside>
            <hr />
          </article>
          <article className="produtosListagem">
            <Produto />
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
