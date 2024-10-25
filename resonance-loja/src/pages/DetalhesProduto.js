import React, { useState, useEffect } from "react";
import "../styles/detalhesProduto.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerSecundario from "../assets/images/bannerSecundario-Desktop.png";
import BannerSecundarioMobile from "../assets/images/bannerSecundario-Mobile.png";

export default function DetalhesProduto() {
  const [banner, setBanner] = useState(BannerSecundario);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) { // Por exemplo, para telas menores que 768px
        setBanner(BannerSecundarioMobile);
      } else {
        setBanner(BannerSecundario);
      }
    };

    handleResize(); // Verifica o tamanho da tela ao montar o componente
    window.addEventListener('resize', handleResize); // Adiciona o listener de resize

    return () => {
      window.removeEventListener('resize', handleResize); // Limpa o listener ao desmontar
    };
  }, []);

  return (
    <div className="detalhesProduto">
      <Header cor="#121212" />
      <main className="produtoDetalhes">
        <section className="fotosDetalhes">
          <article className="fotos">
            <h2>Nome</h2>
            <div>
              <aside>
                Fotos
              </aside>
              <aside>
                Foto Foco
              </aside>
            </div>
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
        <section className="descricaoParteTwo">
          <article>
            <h2>Nome</h2>
            <p>Descrição 2</p>
          </article>
          <article className="bannerSecundario">
            <img src={banner} alt="Banner secundário" />
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
