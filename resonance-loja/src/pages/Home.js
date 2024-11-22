import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Music from "../components/Music";
import Produto from "../components/Produto";
import "../styles/home.css";
import "../styles/global.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lista de produtos
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
          slidesToShow: 2, // Exibir 1 produto em telas pequenas
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1, // Exibir 1 produto em telas pequenas
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [eletric, setEletric] = useState([]);
  const [semiacustico, setSemiacustico] = useState([]);
  const [acustico, setAcustico] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const isAdmin = user?.role === "ADMIN"; // Verifica se o usuário é administrador
        const response = await api.get(`/produtos?admin=${isAdmin}`);
        const produtos = response.data;

        // Filtrando produtos por categorias
        setEletric(produtos.filter((produto) => produto.categoriaId === 3));
        setSemiacustico(
          produtos.filter((produto) => produto.categoriaId === 2)
        );
        setAcustico(produtos.filter((produto) => produto.categoriaId === 1));

        setLoading(false);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message); // Exibe a mensagem de erro da API
        } else {
          setError("Erro desconhecido. Por favor, tente novamente.");
        }
        setLoading(false); // Interrompe o estado de carregamento ao encontrar erro
      }
    };

    fetchProdutos();
  }, [user?.role]); // Adiciona `user?.role` como dependência


  if (loading) {
    return <div>Carregando produtos...</div>;
  }
  console.log(produtos)
  return (
    <div className="home">
      <Header />
      <Banner />
      <Music />
      <main>
        <section className="primeiraSessao">
          <article className="sessaoInterna">
            <h1 className="titulo">Eletricos:</h1>
            <Slider {...settings}>
              {eletric.map((produto, index) => (
                <div key={index}>
                  <Produto Produto={produto} />
                </div>
              ))}
            </Slider>
          </article>
        </section>
        <section className="primeiraSessao sessaoMeio">
          <article className="sessaoInterna">
            <h1 className="titulo meio">Semiacústico:</h1>
            <Slider {...settings}>
              {semiacustico.map((produto, index) => (
                <div key={index}>
                  <Produto Produto={produto} />
                </div>
              ))}
            </Slider>
          </article>
        </section>
        <section className="primeiraSessao">
          <article className="sessaoInterna">
            <h1 className="titulo">Acústico:</h1>
            <Slider {...settings}>
              {acustico.map((produto, index) => (
                <div key={index}>
                  <Produto Produto={produto} />
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
