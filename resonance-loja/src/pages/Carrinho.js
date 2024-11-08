import React, { useEffect, useState, useContext } from "react";
import "../styles/carrinho.css";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProdutoCarrinho from "../components/ProdutoCarrinho";

export default function Carrinho() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    nome: "",
    cep: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    numero: "",
  });
  const [carrinhoItens, setCarrinhoItens] = useState([]);
  const [total, setTotal] = useState(0);
  const [metodoPagamento, setMetodoPagamento] = useState(""); // Controla o método de pagamento

  useEffect(() => {
    const fetchUsuarioECarrinho = async () => {
      try {
        const fetchUserData = async () => {
          try {
            const response = await api.get(`/perfil`);
            setUserData({
              nome: response.data.nome || "",
              cep: response.data.endereco.cep || "",
              cidade: response.data.endereco.cidade || "",
              bairro: response.data.endereco.bairro || "",
              logradouro: response.data.endereco.logradouro || "",
              complemento: response.data.endereco.complemento || "",
              numero: response.data.endereco.numero || "",
            });
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
          }
        };
        fetchUserData();

        // Puxar dados do carrinho do usuário
        const response = await api.get("/carrinho"); // Faz a requisição da API

        // Define os itens do carrinho com os produtos retornados
        setCarrinhoItens(response.data["produtos-carrinho"]);

        // Calcular o total do carrinho
        const totalCarrinho = response.data["produtos-carrinho"].reduce(
          (acc, item) => acc + item.produto.preco * item.quantidade,
          0
        );
        setTotal(totalCarrinho);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário e carrinho", error);
      }
    };

    fetchUsuarioECarrinho();
  }, []);

  const handleDeletarItem = async (produtoId) => {
    try {
      // Envia a requisição para remover o item no servidor
      await api.delete(`/carrinho/${produtoId}`);
  
      // Atualiza o estado do carrinho, removendo o item da lista
      setCarrinhoItens((prevCarrinho) =>
        prevCarrinho.filter((item) => item.produtoId !== produtoId)
      );
  
      // Recalcula o total após a remoção
      const totalCarrinho = carrinhoItens.reduce(
        (acc, item) => acc + item.produto.preco * item.quantidade,
        0
      );
      setTotal(totalCarrinho);
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

  const handleAtualizarQuantidade = async (produtoId, novaQuantidade) => {
    try {
      // Envia a requisição PUT para a API para atualizar a quantidade do produto
      await api.put('/carrinho', { produtoId, quantidade: novaQuantidade });
      
      // Atualiza o estado com a nova quantidade
      setCarrinhoItens((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: novaQuantidade }
            : item
        );
        
        // Recalcula o total após atualizar o carrinho
        const totalCarrinho = updatedItems.reduce(
          (acc, item) => acc + item.produto.preco * item.quantidade,
          0
        );
        setTotal(totalCarrinho);
        
        return updatedItems; // Retorna os itens atualizados
      });
    } catch (error) {
      console.error("Erro ao atualizar quantidade na API:", error);
      if (error.response) {
        console.error("Erro no servidor:", error.response.data);  // Exibe a resposta do servidor
      }
    }
  };

  const handleCriarPedido = async (event) => {
    event.preventDefault(); // Impede o envio do formulário

    if (!metodoPagamento) {
      setError("Por favor, selecione um método de pagamento.");
      return;
    }

    try {
      // Cria o pedido com o método de pagamento selecionado
      await api.post("/pedidos", { metodoPagamento });
      alert("Pedido realizado com sucesso!");

      // Limpa o carrinho após o pedido
      setCarrinhoItens([]);
      setTotal(0);
      navigate("/");
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

  return (
    <div className="carrinho" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header cor="#121212" />
      <main>
        <section className="titleCarrinho">
          <h2>Carrinho de compras</h2>
        </section>
        <form onSubmit={handleCriarPedido}>
          <section className="carrinhoSection">
            <article className="itensCarrinho">
              {carrinhoItens.length > 0 ? (
                carrinhoItens.map((item) => (
                  <ProdutoCarrinho
                    key={item.produto.id}  // Adiciona a chave única aqui
                    produtoId={item.produto.id}
                    nome={item.produto.nome}
                    preco={item.produto.preco}
                    quantidadeProduto={item.quantidade}
                    imagem={item.produto.imagens[0]}
                    deletarItem={() => handleDeletarItem(item.produtoId)}
                    atualizarQuantidade={handleAtualizarQuantidade}
                  />
                ))
              ) : (
                <p>Seu carrinho está vazio.</p>
              )}
            </article>
            <hr className="mobile" />
            <article className="precoInfos">
              <hr className="web" />
              <aside className="infosPagamento">
                <section>
                  <h2>Endereço de entrega</h2>
                  <p className="enderecoText">
                    {userData?.logradouro + " - " + userData?.bairro + " - " + userData?.numero + " - " + userData?.complemento + " - " + userData?.cidade + " - " + userData?.cep || "Endereço não cadastrado"}
                  </p>
                  <button className="buttonNavigatePerfil" onClick={() => navigate('/perfil')}><strong>Editar endereço</strong></button>
                </section>
                <section>
                  <h2>Forma de Pagamento</h2>
                  <div className="botoesPagamento">
                    <select
                      className="selectPagamento"
                      value={metodoPagamento}  // Controla o valor selecionado
                      onChange={(e) => setMetodoPagamento(e.target.value)} // Atualiza o estado
                    >
                      <option value="">Escolher método de pagamento</option>
                      <option value="pix">Pagamento via Pix</option>
                      <option value="cheque">Pagamento via Cheque</option>
                      <option value="cartao">Pagamento via Cartão</option>
                    </select>
                  </div>
                </section>
                <section>
                  <h2>Total: R$ {total.toFixed(2)}</h2>
                  <input type="submit" value="Finalizar Pedido" onClick={handleCriarPedido}/>
                </section>
              </aside>
            </article>
          </section>
        </form>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
