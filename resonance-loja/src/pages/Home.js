import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header/>
      <Banner />
      <h1>Home</h1>
      <Footer corTexto="#fff" corBackground="#000" corSecundaria="#6f5f40"/>
    </div>
  );
}
