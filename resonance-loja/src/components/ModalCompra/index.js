import React from "react";
import "./styles.css"; // Estilize o modal conforme necessário

const ModalCompra = ({ compra, onClose }) => {
  return (
    <div className="modal">
      <div className="modalContent">
        <section className="cabecalhoModel">
          <p>ID da Compra: {compra.idCompra}</p>
          <button onClick={onClose}>X</button>
        </section>
        <h2>Detalhes da Compra</h2>
        <section className="produtosCompra">
          {compra.produtos && compra.produtos.length > 0 ? (
            compra.produtos.map((produto, index) => (
              <article className="infosModel" key={index}>
                <img src={produto.imagem} alt={produto.nome} width="150px" height="150px" />
                <aside>
                  <p>Nome do produto: {produto.nome}</p>
                  <p>Preço: R$ {produto.preco}</p>
                </aside>
              </article>
            ))
          ) : (
            <p>Nenhum produto encontrado para esta compra.</p>
          )}
        </section>
        <section className="totalCompra">
          <p><strong>Total da Compra: R$ {compra.precostotal}</strong></p>
        </section>
      </div>
    </div>
  );
};

export default ModalCompra;
