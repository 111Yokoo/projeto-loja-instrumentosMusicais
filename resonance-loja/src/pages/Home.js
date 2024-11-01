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

  //Buscar produtos ao montar o componente
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const isAdmin = user?.role === "ADMIN"; // Verifica se o usuário é administrador
        const response = await api.get(`/produtos?admin=${isAdmin}`);
        setProdutos(response.data);
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

  const handleAddToCart = async (produtoId) => {
    try {
      await api.post("/carrinho", {
        userId: user.id, // Certifique-se de que o ID do usuário está correto
        produtoId, // ID do produto
        quantidade: 1, // Quantidade a ser adicionada
      });
      alert("Produto adicionado ao carrinho com sucesso!"); // Notifica o sucesso
      navigate("/carrinho");
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
    }
  };

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

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
