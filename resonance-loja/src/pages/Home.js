import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Music from "../components/Music";
import Destaques from "../components/Destaques";
import "../styles/home.css";
import "../styles/global.css";

export default function Home() {
  return (
    <div>
      <Header/>
      <Banner />
      <Music />
      <Destaques />
      <Footer corTexto="#fff" corBackground="#000" corSecundaria="#6f5f40"/>
    </div>
  );
}
