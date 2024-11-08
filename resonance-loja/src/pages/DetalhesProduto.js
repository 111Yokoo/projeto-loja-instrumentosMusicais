import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from '../services/api';
import "../styles/detalhesProduto.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerSecundario from "../assets/images/bannerSecundario-Desktop.png";
import BannerSecundarioMobile from "../assets/images/bannerSecundario-Mobile.png";

export default function DetalhesProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(BannerSecundario);
  const [imagemAtiva, setImagemAtiva] = useState(0); // Estado para controlar a imagem ativa

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) {
        setBanner(BannerSecundarioMobile);
      } else {
        setBanner(BannerSecundario);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error('Erro ao buscar o produto', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="detalhesProduto">
      <Header cor="#121212" />
      <main className="produtoDetalhes">
        <section className="fotosDetalhes">
          <article className="fotos">
            <h2>{produto.nome}</h2>
            <div className="galeria">
              <aside className="miniaturas">
                {produto.imagens.map((imagem, index) => (
                  <img
                    key={index}
                    src={imagem}
                    alt={`Imagem ${index + 1}`}
                    width="100px"
                    height="100px"
                    onClick={() => setImagemAtiva(index)} // Atualiza a imagem ativa ao clicar
                    className={imagemAtiva === index ? "ativa" : ""}
                  />
                ))}
              </aside>
              <aside className="imagemPrincipal">
                <img src={produto.imagens[imagemAtiva]} className="imagemPrincipalFoto" alt="Imagem principal" />
              </aside>
            </div>
          </article>
          <article className="descricao">
            <aside>
              <h2>{produto.nome}</h2>
              <p>{produto.descricao}</p>
            </aside>
            <hr />
            <aside>
              Cores:
              <div className="coresList">
                {produto.cores.map((cor, index) => (
                  <div
                    key={index}
                    className="colorFilter"
                    style={{ background: `#${cor.hexadecimal}` }}
                  ></div>
                ))}
              </div>
            </aside>
            <hr />
            <aside>
              <p>Preço: R${produto.preco}</p>
            </aside>
            <button>Adicionar ao carrinho</button>
          </article>
        </section>
        <section className="descricaoParteTwo">
          <article>
            <h2>{produto.tituloInformacao}</h2>
            <p>{produto.informacao}</p>
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