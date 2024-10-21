import React from "react";
import "../styles/carrinho.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProdutoCarrinho from "../components/ProdutoCarrinho";


export default function Carrinho() {
  return (
    <div className="carrinho">
      <Header cor="#121212" />
      <main>
        <section className="titleCarrinho">
          <h2>Carrinho de compras</h2>
        </section>
        <section className="carrinhoSection">
          <article>
              <ProdutoCarrinho nome="guitarra" preco="1200" quantidadeProduto={2}/>
          </article>
          <article className="precoInfos">
          <hr />
            <aside>
              <h2>Total: R$ </h2>
              <input type="submit" value="Finalizar Pedido"/>
            </aside>
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40"/>
    </div>
  );
}
