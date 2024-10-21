import React, { useState } from "react";
import "./styles.css";

const ProdutoCarrinho = ({ imagem, nome, preco, quantidadeProduto }) => {
  const [quantidade, setQuantidade] = useState(quantidadeProduto);

  const aumentarQuantidade = () => setQuantidade(quantidade + 1);
  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  return (
    <section className="productCarrinho">
      <article>
        <img src={imagem} width="200px" height="200px" alt={nome} />
      </article>
      <article className="infosCarrinho">
        <aside><h2>{nome}</h2></aside>
        <aside><h2>R$ {preco}</h2></aside>
        <div class="quantidade">
          <aside className="quantidadeSection">
            <button className="buttonQuantity" onClick={diminuirQuantidade}>-</button>
            <span className="quantity">{quantidade}</span>
            <button className="buttonQuantity" onClick={aumentarQuantidade}>+</button>
          </aside>
          <aside>
            <button className="buttonRemove" onClick={() => {}}><strong>Remover</strong></button>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default ProdutoCarrinho;
