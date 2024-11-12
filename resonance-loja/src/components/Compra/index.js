import React from "react";
import "./styles.css";

const Compra = ({ preco, nomeUsuario, onClick, data }) => {
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
    return (
      <section onClick={onClick} className="compraCartao">
        <h2>Nome Comprador:</h2>
        <p>{nomeUsuario}</p>
        <article className="infosCompra">
          <aside><h2>R$ {preco}</h2></aside>
          <aside>Compra realizada em {dataFormatada}</aside>
        </article>
      </section>
    );
};

export default Compra;
