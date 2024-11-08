import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate para navegação
import "./styles.css";

const ProdutoCarrinho = ({ produtoId, imagem, nome, preco, quantidadeProduto }) => {
  const navigate = useNavigate(); // Instancia o navigate
  const [quantidade, setQuantidade] = useState(quantidadeProduto);

  const aumentarQuantidade = () => setQuantidade(quantidade + 1);
  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  // Função para navegar para a página de descrição do produto
  const navigateToDescription = () => {
    navigate(`/produto/${produtoId}`);
  };

  return (
    <section className="productCarrinho" onClick={navigateToDescription}>
      <article>
        <img src={imagem} width="200px" height="200px" alt={nome} />
      </article>
      <article className="infosCarrinho">
        <aside><h2>{nome}</h2></aside>
        <aside><h2>R$ {preco}</h2></aside>
        <div className="quantidade">
          <aside className="quantidadeSection">
            <button className="buttonQuantity" onClick={(e) => { e.stopPropagation(); diminuirQuantidade(); }}>-</button>
            <span className="quantity">{quantidade}</span>
            <button className="buttonQuantity" onClick={(e) => { e.stopPropagation(); aumentarQuantidade(); }}>+</button>
          </aside>
          <aside>
            <button className="buttonRemove" onClick={(e) => { e.stopPropagation(); /* Função de remover produto */ }}><strong>Remover</strong></button>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default ProdutoCarrinho;
