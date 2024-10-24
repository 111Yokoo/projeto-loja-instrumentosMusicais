import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Music from "../components/Music";
import Produto from "../components/Produto";
import Capa from "../assets/images/FooFightersCapaAlbum.jfif"; 
import "../styles/home.css";
import "../styles/global.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lista de produtos
const produtos = [
  { Foto: Capa, Nome: "Guitarra", Preco: "1500", Cor: "#fff" },
  { Foto: Capa, Nome: "Bateria", Preco: "2000", Cor: "#fff" },
  { Foto: Capa, Nome: "Baixo", Preco: "1700", Cor: "#fff" },
  { Foto: Capa, Nome: "Teclado", Preco: "1200", Cor: "#fff" },
  { Foto: Capa, Nome: "Microfone", Preco: "800", Cor: "#fff" },
];

export default function Home() {
  const settings = {
    dots: false, // Habilitar pontos abaixo do carrossel
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Número padrão de produtos a serem exibidos
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3, 
        },
      },
      {
        breakpoint: 888,
        settings: {
          slidesToShow: 2, // Exibir 2 produtos em telas médias
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1, // Exibir 1 produto em telas pequenas
        },
      },
    ],
  };

  return (
    <div className="home">
      <Header />
      <Banner />
      <Music />
      <main>
        <section className="primeiraSessao">
          <article className="sessaoInterna">
            <h1 className="titulo">Mais vendidos:</h1>
            <Slider {...settings}>
              {produtos.map((produto, index) => (
                <div key={index}>
                  <Produto
                    Foto={produto.Foto}
                    Nome={produto.Nome}
                    Preco={produto.Preco}
                    Cor={produto.Cor}
                  />
                </div>
              ))}
            </Slider>
          </article>
        </section>
        <section className="primeiraSessao sessaoMeio">
          <article className="sessaoInterna">
            <h1 className="titulo meio">Talvez você goste de:</h1>
            <Slider {...settings}>
              {produtos.map((produto, index) => (
                <div key={index}>
                  <Produto
                    Foto={produto.Foto}
                    Nome={produto.Nome}
                    Preco={produto.Preco}
                    Cor={produto.Cor}
                  />
                </div>
              ))}
            </Slider>
          </article>
        </section>
        <section className="primeiraSessao">
          <article className="sessaoInterna">
            <h1 className="titulo">Mais antigos:</h1>
            <Slider {...settings}>
              {produtos.map((produto, index) => (
                <div key={index}>
                  <Produto
                    Foto={produto.Foto}
                    Nome={produto.Nome}
                    Preco={produto.Preco}
                    Cor={produto.Cor}
                  />
                </div>
              ))}
            </Slider>
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
