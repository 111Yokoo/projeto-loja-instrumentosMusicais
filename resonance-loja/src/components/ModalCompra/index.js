import React from "react";
import "./styles.css"; // Estilize o modal conforme necessário

const ModalCompra = ({ compra, onClose }) => {
  return (
    <div className="modal">
      <div className="modalContent">
        <section className="cabecalhoModel">
            <p>{compra.idCompra}</p>
            <button onClick={onClose}>X</button>
        </section>
        <h2>Detalhes da Compra</h2>
        <section className="produtosCompra">
            <article className="infosModel">
                <img src={compra.imagem} alt={compra.nomes} width="150px" height="150px"/>
                <aside>
                    <p>Nome do produto: {compra.nomes}</p>
                    <p>Preço: R$ {compra.precos}</p>
                </aside>
            </article>  
        </section>
      </div>
    </div>
  );
};

export default ModalCompra;