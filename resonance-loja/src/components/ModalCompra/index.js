import React from "react";
import "./styles.css";

const ModalCompra = ({ compra, onClose }) => {
  // Calcula o total da compra somando o preço de cada item multiplicado pela quantidade
  const calcularPrecoTotal = () => {
    return compra.itens.reduce((total, item) => {
      return total + item.preco * item.quantidade;
    }, 0);
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <section className="cabecalhoModel">
          <p>ID da Compra: {compra.id}</p>
          <button onClick={onClose}>X</button>
        </section>
        <h2>Detalhes da Compra</h2>
        <section className="produtosCompra">
          {compra.itens && compra.itens.length > 0 ? (
            compra.itens.map((produto, index) => (
              <article className="infosModel" key={index}>
                <aside>
                  <p><strong>Nome do produto:</strong> {produto.produto.nome}</p>
                  <p><strong>Preço unitário:</strong> R$ {produto.preco}</p>
                  <p><strong>Quantidade:</strong> {produto.quantidade}</p>
                  <p><strong>Subtotal:</strong> R$ {produto.preco * produto.quantidade}</p>
                </aside>
              </article>
            ))
          ) : (
            <p>Nenhum produto encontrado para esta compra.</p>
          )}
        </section>
        <section className="totalCompra">
          <p><strong>Total da Compra: R$ {calcularPrecoTotal()}</strong></p>
        </section>
      </div>
    </div>
  );
};

export default ModalCompra;
