import React from "react";
import "../styles/carrinho.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProdutoCarrinho from "../components/ProdutoCarrinho";

export default function Carrinho() {
  const navigate = useNavigate();
  return (
    <div className="carrinho">
      <Header cor="#121212" />
      <main>
        <section className="titleCarrinho">
          <h2>Carrinho de compras</h2>
        </section>
        <section className="carrinhoSection">
          <article>
              <ProdutoCarrinho nome="guitarra" preco="1200" quantidadeProduto={1}/>
          </article>
          <hr className="mobile"/>
          <article className="precoInfos">
          <hr className="web"/>
            <aside className="infosPagamento">
              <section>
                <h2>Endereço de entrega</h2>
                <p>Endereço</p>
                <button className="buttonNavigatePerfil" onClick={() => navigate('/perfil')}><strong>Editar endereço</strong></button>
              </section>
              <section>
                <h2>Forma de Pagamento</h2>
                <div className="botoesPagamento">
                  <select className="selectPagamento">
                    <option value="">Escolher método de pagamento</option>
                    <option value="pix">Pagamento via Pix</option>
                    <option value="cheque">Pagamento via Cheque</option>
                    <option value="cartao">Pagamento via Cartão</option>
                  </select>
                </div>
              </section>
              <section>
                <h2>Total: R$ </h2>
                <input type="submit" value="Finalizar Pedido"/>
              </section>
            </aside>
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40"/>
    </div>
  );
}
