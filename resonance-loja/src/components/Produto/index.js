import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./styles.css";
import { FaPencilAlt } from "react-icons/fa";

const Produto = ({ Foto, Nome, Preco, Cor }) => {
  const navigate = useNavigate();
  const [logado, setLogado] = useState(false);

  const handleCarrinhoClick = (e) => {
    e.stopPropagation(); 
    navigate('/carrinho');
  };
  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate('/admin/criarProdutos');
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
            {logado ? <><span className="carrinho" onClick={handleEditClick}>
            <FaPencilAlt />
            </span> </> : <span className="carrinho" onClick={handleCarrinhoClick}>
              <FaShoppingCart />
            </span> }
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
