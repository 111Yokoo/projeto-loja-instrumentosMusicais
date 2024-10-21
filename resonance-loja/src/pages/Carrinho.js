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
              <ProdutoCarrinho nome="guitarra" preco="1200" quantidadeProduto={2}/>
          </article>
          <article className="precoInfos">
          <hr />
            <aside className="infosPagamento">
              <section>
                <h2>Endereço de entrega</h2>
                <p>Endereço</p>
                <button className="buttonNavigatePerfil" onClick={() => navigate('/perfil')}><strong>Editar endereço</strong></button>
              </section>
              <section>
                <h2>Forma de Pagamento</h2>
                <div className="botoesPagamento">
                  <button className="buttonPix">Pix</button>
                  <button className="buttonCheque">Cheque</button>
                  <button className="buttonCartao">Cartão</button>
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
