import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Biblioteca externa
import { FaShoppingCart, FaPencilAlt } from "react-icons/fa"; // Biblioteca externa
import { AuthContext } from "../../contexts/AuthContext"; // Módulo interno
import api from "../../services/api";
import "./styles.css"; // Arquivo de estilos

const Produto = ({ Produto }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(""); // Estado para feedback visual
  const { user } = useContext(AuthContext);

  // Função para formatar o preço
  const formatPrice = (price) =>
    price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Verifique se Produto, Produto.imagens e Produto.cores estão definidos
  if (!Produto || !Produto.imagens || !Produto.imagens[0] || !Produto.cores || !Produto.cores[0]) {
    return (
      <div className="produtoNaoEncontrado">
        <p>Produto não encontrado ou informações incompletas.</p>
        <button onClick={() => navigate("/")}>Voltar para a Home</button>
      </div>
    );
  }

  const handleAddToCart = async (produtoId) => {
    try {
      await api.post("/carrinho", {
        userId: user.id, // Certifique-se de que o ID do usuário está correto
        produtoId, // ID do produto
        quantidade: 1, // Quantidade a ser adicionada
      });
      setFeedback("Produto adicionado ao carrinho!");
      setTimeout(() => setFeedback(""), 3000); // Remove feedback após 3 segundos
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/admin/editarProdutos/${Produto.id}`);
  };

  const logarAntes = (e) => {
    e.stopPropagation();
    navigate("/login");
  };

  return (
    <section onClick={() => navigate(`/produto/${Produto.id}`)} className="produto">
      {/* Feedback visual */}
      {feedback && <p className="feedback">{feedback}</p>}

      {/* Erro ao adicionar ao carrinho */}
      {error && <p className="error">{error}</p>}

      <article className="imagem">
        {/* Exibe as cores acima da imagem */}
        <div className="coresAcima">
          {Produto.cores.map((cor) => (
            <p
              key={cor.id}
              style={{ background: `#${cor.hexadecimal}` }}
              className="cor"
            ></p>
          ))}
        </div>

        {/* Fallback para imagem do produto */}
        <div>
          <img
            src={Produto.imagens[0] || "/caminho/para/imagem-padrao.jpg"}
            alt={`Imagem do produto ${Produto.nome}`}
            className="imagemFoto"
          />
        </div>
      </article>

      <article className="produtoDescricao">
        <aside className="produtoParteOne">
          <p>Resonance</p>
          {user ? (
            // Verifica se o usuário está logado e é ADMIN
            user.role === "ADMIN" ? (
              <span
                className="carrinho"
                onClick={handleEditClick}
                aria-label="Editar produto"
              >
                <FaPencilAlt />
              </span>
            ) : (
              // Se não for ADMIN, exibe o ícone do carrinho
              <span
                className="carrinho"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(Produto.id);
                }}
                aria-label="Adicionar ao carrinho"
              >
                <FaShoppingCart />
              </span>
            )
          ) : (
            // Se o usuário não estiver logado, exibe o ícone do carrinho
            <span
              className="carrinho"
              onClick={logarAntes}
              aria-label="Fazer login para adicionar ao carrinho"
            >
              <FaShoppingCart />
            </span>
          )}
        </aside>
        <aside>
          <h3 className="nomeProduto">
            {Produto.nome.length > 30
              ? `${Produto.nome.substring(0, 30)}...`
              : Produto.nome}
          </h3>
          <p>R${formatPrice(Produto.preco)}</p>
        </aside>
      </article>
    </section>
  );
};

export default Produto;
