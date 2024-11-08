import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate para navegação
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./styles.css";

const ProdutoCarrinho = ({ produtoId, imagem, nome, preco, quantidadeProduto, deletarItem }) => {
  const navigate = useNavigate(); // Instancia o navigate
  const [quantidade, setQuantidade] = useState();
  
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
    <section className="productCarrinho">
      <article>
        <img src={imagem} style={{cursor: "pointer"}} width="200px" height="200px" alt={nome} onClick={navigateToDescription}/>
      </article>
      <article className="infosCarrinho">
        <aside style={{cursor: "pointer"}} onClick={navigateToDescription}><h2>{nome}</h2></aside>
        <aside style={{cursor: "pointer"}} onClick={navigateToDescription}><h2>R$ {preco}</h2></aside>
        <div className="quantidade">
          <aside className="quantidadeSection">
            <button className="buttonQuantity" onClick={() => diminuirQuantidade()}><FaMinus /></button>
            <span className="quantity">{quantidadeProduto}</span>
            <button className="buttonQuantity" onClick={() => aumentarQuantidade()}><FaPlus /></button>
          </aside>
          <aside>
            <button className="buttonRemove" onClick={() => deletarItem(produtoId)}>
              <strong>Remover</strong>
            </button>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default ProdutoCarrinho;
