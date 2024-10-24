import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaSquareYoutube } from "react-icons/fa6";
import "./styles.css";

const Footer = ({corTexto, corBackground, corSecundaria}) => {
    return (
    <footer id="contato" style={{backgroundColor: corBackground}}>
        <section className="containerLink">
            <ul className="linksExternos">
                <a href="www.instagram.com/">
                    <li style={{color: corSecundaria}}><FaSquareInstagram /></li>
                </a>
                <a href="https://www.facebook.com/">
                    <li style={{color: corSecundaria}}><FaFacebookSquare /></li>
                </a>
                <a href="https://mail.google.com/mail">
                    <li style={{color: corSecundaria}}><MdEmail /></li>
                </a>
                <a href="https://www.youtube.com">
                    <li style={{color: corSecundaria}}><FaSquareYoutube /></li>
                </a>
            </ul>
        </section>
        <section className="containerMeio">
            <p style={{color: corTexto}}>Todos os direitos reservados &copy; Nexgen</p>
        </section>
        <section className="containerFim">
            <p style={{color: corTexto}}><a href="#" style={{color: corTexto}}>Privacy Policy</a> | <a href="#" style={{color: corTexto}}>Termos e condições</a></p>
        </section>
    </footer>
  );
};


export default Footer;
