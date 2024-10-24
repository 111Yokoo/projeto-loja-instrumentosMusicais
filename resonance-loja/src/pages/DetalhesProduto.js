import React from "react";
import "../styles/detalhesProduto.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerSecundario from "../assets/images/bannerSecundario-Desktop.png"

export default function DetalhesProduto() {
  return (
    <div className="detalhesProduto">
      <Header cor="#121212"/>
      <main className="produtoDetalhes">
        <section className="fotosDetalhes">
          <article className="fotos">
            <aside>
              Fotos
            </aside>
            <aside>
              Foto Foco
            </aside>
          </article>
          <article className="descricao">
            <aside>
              <h2>Nome</h2>
              <p>Descrição 1</p>
            </aside>
            <hr />
            <aside>
              Cor:
              <div
                  className="colorFilter"
                  onClick={() => {}}
                  style={{ background: "#000" }}
                ></div>
            </aside>
            <hr />
            <aside>
              Preço: Preco
            </aside>
            <button>Adiciona carrinho</button>
          </article>
        </section>
        <section>
          <article>
            <h2>Nome</h2>
            <p>Descrição 2</p>
          </article>
          <article>
            <img src={BannerSecundario} />
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
