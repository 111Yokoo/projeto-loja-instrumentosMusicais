import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate para navegação
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./styles.css";

const ProdutoCarrinho = ({ produtoId, imagem, nome, preco, quantidadeProduto, deletarItem, atualizarQuantidade }) => {
  const navigate = useNavigate(); // Instancia o navigate
  const [quantidade, setQuantidade] = useState(quantidadeProduto);

  useEffect(() => {
    setQuantidade(quantidadeProduto); // Atualiza a quantidade inicial com o valor passado como prop
  }, [quantidadeProduto]);


  const aumentarQuantidade = (event) => {
    event.preventDefault();
    const novaQuantidade = quantidade + 1;
    setQuantidade(novaQuantidade);
    atualizarQuantidade(produtoId, novaQuantidade);  // Chama a função para atualizar a quantidade
  };
  
  const diminuirQuantidade = (event) => {
    event.preventDefault();
    if (quantidade > 1) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      atualizarQuantidade(produtoId, novaQuantidade);  // Chama a função para atualizar a quantidade
    }
  };
  // Função para navegar para a página de descrição do produto
  const navigateToDescription = () => {
    navigate(`/produto/${produtoId}`);
  };

  return (
    <section className="productCarrinho">
      <article>
        <img
          src={imagem}
          style={{ cursor: "pointer" }}
          width="200px"
          height="200px"
          alt={nome}
          onClick={navigateToDescription}
        />
      </article>
      <article className="infosCarrinho">
        <aside style={{ cursor: "pointer" }} onClick={navigateToDescription}>
          <h2>{nome}</h2>
        </aside>
        <aside style={{ cursor: "pointer" }} onClick={navigateToDescription}>
          <h2>R$ {preco}</h2>
        </aside>
        <div className="quantidade">
          <aside className="quantidadeSection">
            <button
              className="buttonQuantity"
              onClick={diminuirQuantidade}
            >
              <FaMinus />
            </button>
            <span className="quantity">{quantidade}</span>
            <button
              className="buttonQuantity"
              onClick={aumentarQuantidade}
            >
              <FaPlus />
            </button>
          </aside>
          <aside>
            <button
              className="buttonRemove"
              onClick={() => deletarItem(produtoId)}
            >
              <strong>Remover</strong>
            </button>
          </aside>
        </div>
      </article>
    </section>
  );
};

export default ProdutoCarrinho;
