import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./styles.css";

const Produto = ({ Foto, Nome, Preco, Cor }) => {
  const navigate = useNavigate();

  const handleCarrinhoClick = (e) => {
    e.stopPropagation(); // Impede a propagação do evento para o elemento pai
    navigate('/carrinho');
  };

  return (
    <section onClick={() => navigate('/produto/:id')} className="produto">
      <article style={{ backgroundImage: `url(${Foto})`, backgroundSize: 'cover' }} className="imagem">
        <span>
          <p style={{ background: `${Cor}` }} className="cor"></p>
        </span>
      </article>
      <article className="produtoDescricao">
        <aside className="produtoParteOne">
          <p>Resonance</p>
          <span className="carrinho" onClick={handleCarrinhoClick}>
            <FaShoppingCart />
          </span>
        </aside>
        <aside>
          <h3 className="nomeProduto">{Nome}</h3>
          <p>R${Preco}</p>
        </aside>
      </article>
    </section>
  );
};

export default Produto;
