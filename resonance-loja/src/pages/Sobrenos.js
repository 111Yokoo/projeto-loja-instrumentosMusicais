import React, { useState, useEffect } from "react";
import "../styles/sobrenos.css";
import Banner from "../assets/images/Banner-SobreNos.png"
import SobrenosImagemOne from "../assets/images/sobrenosFigura1.png"
import SobrenosImagemTwo from "../assets/images/sobrenosFigura2.png"
import SobrenosImagemTree from "../assets/images/sobrenosFigura3.png"
import SobrenosImagemFour from "../assets/images/sobrenosFigura4.png"
import SobreNosMobileBanner from "../assets/images/Banner-SobreNos-Mobile.png"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Sobrenos() {
  const [bannerImage, setBannerImage] = useState(Banner);

  const updateBannerImage = () => {
    if (window.innerWidth <= 660) {
      setBannerImage(SobreNosMobileBanner);
    } else {
      setBannerImage(Banner);
    }
  };

  useEffect(() => {
    updateBannerImage(); // Set initial banner image
    window.addEventListener("resize", updateBannerImage);

    return () => {
      window.removeEventListener("resize", updateBannerImage);
    };
  }, []);

  return (
    <div className="sobrenos">
      <Header />
      <section className="banner">
        <img src={bannerImage} alt="Banner" width="100%" />
      </section>
        <main>
          <section className="sessaoHistory incolor">
            <article>
              <h2>Não vendemos guitarras, vendemos sonhos</h2>
              <p>Em uma pequena cidade chamada Jaboticabal, havia uma loja de guitarras chamada "Resonance". O proprietário, um luthier chamado Matheus dozono, era conhecido por sua habilidade excepcional em criar e restaurar guitarras. Cada guitarra que ele vendia carregava uma história única, e Matheus sempre se esforçava para conectar cada instrumento ao seu novo dono.</p>
            </article>
            <img src={SobrenosImagemOne} width="100%" alt="Imagem 1"/>
          </section>
          <section className="sessaoHistory color" style={{background: "#121212", color: "#fff"}}>
            <img src={SobrenosImagemTwo} width="100%"/>
            <article>
              <p>Um dia, um jovem chamado Pedro entrou na loja. Ela sonhava em tocar guitarra, mas tinha medo de nunca conseguir. Matheus, percebendo sua hesitação, convidou-a a experimentar uma guitarra antiga que ele havia restaurado. Enquanto Pedro tocava, uma melodia suave preencheu o ar, e ela se sentiu imediatamente conectada ao instrumento.</p>
            </article>
          </section>
          <section className="sessaoHistory incolor" alt="Imagem 2">
            <article>
              <p>Matheus contou a Pedro a história daquela guitarra: pertencera a um famoso músico que a usava para compor canções que emocionavam milhares de pessoas. Inspirada, Pedro decidiu comprar a guitarra e, com o tempo, desenvolveu suas habilidades.A cada nota que ele tocava, a loja se enchia de novas memórias. Pedro começou a dar pequenas apresentações na cidade, e sua música ressoava nas ruas, atraindo mais amantes da guitarra. Com o passar dos meses, a loja de Matheus se tornou um ponto de encontro para músicos locais, onde eles compartilhavam histórias, aprendiam uns com os outros e criavam novas melodias.</p>
            </article>
            <img src={SobrenosImagemTree} width="100%" alt="Imagem 3"/>
          </section>
          <section className="sessaoHistory color" style={{background: "#6f5f40", color: "#fff"}}>
            <img src={SobrenosImagemFour} width="100%" alt="Imagem 4"/>
            <article>
              <p>Um dia, Pedro decidiu organizar um concerto na loja, convidando todos os músicos que haviam passado por ali. Matheus, emocionado, viu a comunidade se reunir para celebrar a música e a amizade. No final da noite, ele percebeu que a loja não era apenas um lugar para vender guitarras, mas um espaço onde sonhos eram realizados e memórias eram criadas.</p>
            </article>
          </section>
          <section className="fraseFinal">
            <h3>Cada guitarra tem uma história a contar, e cada músico tem o poder de criar novas memórias com suas notas.</h3>
          </section>
        </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40"/>
    </div>
  );
}
