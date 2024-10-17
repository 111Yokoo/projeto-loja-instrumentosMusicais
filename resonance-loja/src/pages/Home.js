import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Music from "../components/Music";
import Produto from "../components/Produto";
import Capa from "../assets/images/FooFightersCapaAlbum.jfif"; 
import "../styles/home.css";
import "../styles/global.css";

export default function Home() {
  return (
    <div className="home">
      <Header/>
      <Banner />
      <Music />
      <main>
        <section className="primeiraSessao">
          <h1 className="titulo">Talvez você goste de:</h1>
          <article className="conteudoPrincipal">
            <Produto Foto={Capa} Nome={"Guitarra"} Preco={"1500"} Cor={"#fff"}/>
            <Produto Foto={Capa} Nome={"Guitarra"} Preco={"1500"} Cor={"#fff"}/>
            <Produto Foto={Capa} Nome={"Guitarra"} Preco={"1500"} Cor={"#fff"}/>
          </article>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#000" corSecundaria="#6f5f40"/>
    </div>
  );
}
