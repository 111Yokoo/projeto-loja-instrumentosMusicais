import React from "react";
import "../styles/registro.css";
import "../styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../assets/images/Logo.png"
import Fundo from "../assets/images/Fundo-Login-Signup.png"

export default function Registro() {
  return (
    <div style={{backgroundImage: `url(${Fundo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'}} className="fundo">
      <Header/>
        <main>
            <section>
              <img src={Logo} />
              <article>
                <p>Seja bem vindo! Conclua seu cadastro para acessar nossa loja.</p>
              </article>
            </section>
            <section>
              
            </section>
        </main>
      <Footer corTexto="#fff" corBackground="#6f5f40" corSecundaria="#fff"/>
    </div>
  );
}
