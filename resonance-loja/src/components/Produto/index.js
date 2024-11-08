import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Biblioteca externa
import { FaShoppingCart, FaPencilAlt } from "react-icons/fa"; // Biblioteca externa
import { AuthContext } from "../../contexts/AuthContext"; // Módulo interno
import api from "../../services/api";
import "./styles.css"; // Arquivo de estilos

const Produto = ({ Produto }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  // Verifique se Produto, Produto.imagens e Produto.cores estão definidos
  if (!Produto || !Produto.imagens || !Produto.imagens[0] || !Produto.cores || !Produto.cores[0]) {
    return <div>Produto não encontrado</div>; // Exibe uma mensagem ou retorna null se não encontrar o produto
  }

  const handleAddToCart = async (produtoId) => {
    try {
      await api.post("/carrinho", {
        userId: user.id, // Certifique-se de que o ID do usuário está correto
        produtoId, // ID do produto
        quantidade: 1, // Quantidade a ser adicionada
      });
      alert("Produto adicionado ao carrinho com sucesso!"); // Notifica o sucesso
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

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate('/admin/criarProdutos');
  };

  const logarAntes = (e) => {
    e.stopPropagation();
    navigate('/login');
  };

  return (
    <section onClick={() => navigate(`/produto/${Produto.id}`)} className="produto">
      <article style={{ backgroundImage: `url(${Produto.imagens[0]})`, backgroundSize: 'cover' }} className="imagem">
        <span>
          <p style={{ background: `#${Produto.cores[0].hexadecimal}` }} className="cor"></p>
        </span>
      </article>
      <article className="produtoDescricao">
        <aside className="produtoParteOne">
          <p>Resonance</p>
          {user ? (
            // Verifica se o usuário está logado e é ADMIN
            user.role === "ADMIN" ? (
              <span className="carrinho" onClick={handleEditClick}>
                <FaPencilAlt />
              </span>
            ) : (
              // Se não for ADMIN, exibe o ícone do carrinho
              <span className="carrinho" onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(Produto.id);
              }}>
                <FaShoppingCart />
              </span>
            )
          ) : (
            // Se o usuário não estiver logado, exibe o ícone do carrinho
            <span className="carrinho" onClick={logarAntes}>
              <FaShoppingCart />
            </span>
          )}
        </aside>
        <aside>
          <h3 className="nomeProduto">{Produto.nome}</h3>
          <p>R${Produto.preco}</p>
        </aside>
      </article>
    </section>
  );
};

export default Produto;
