import React, { useState } from "react";
import "../styles/registro.css";
import "../styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../assets/images/Logo.png"
import Fundo from "../assets/images/Fundo-Login-Signup.png"
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { FaSearchLocation } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { CiCompass1 } from "react-icons/ci";
import { PiListNumbersFill } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Registro() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  return (
    <div style={{
      backgroundImage: `url(${Fundo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat-y',
      height: '100%'
  }} className="fundo">
      <Header cor="#121212"/>
        <main className="registrar">
            <form className="formRegistro" action="" method="" >
              <section className="infosOne">
                <img src={Logo} width="250px" alt="Logo Resonance"/>
                <p className="tituloRegistrar">Seja bem vindo! Conclua seu cadastro para acessar nossa loja.</p>
                <article className="inputGroup">
                  <aside>
                    <label for="nome"><p>Nome:</p></label>
                    <div className="formInputRegistro"><MdDriveFileRenameOutline /><input name="nome" id="nome" type="text" placeholder="Digite seu nome"/></div>
                  </aside>
                  <aside>
                    <label for="email"><p>Email:</p></label>
                    <div class="formInputRegistro"><IoMail /><input name="email" id="email" type="text" placeholder="Digite seu email"/></div>
                  </aside>
                  <aside>
                    <label for="telefone"><p>Telefone:</p></label>
                    <div class="formInputRegistro"><FaPhoneAlt /><input name="telefone" id="telefone" type="text" placeholder="Digite seu telefone"/></div>
                  </aside>
                  <aside>
                    <label for="cpf"><p>CPF:</p></label>
                    <div class="formInputRegistro"><IoDocument /><input name="cpf" id="cpf" type="text" placeholder="Digite seu CPF"/></div>
                  </aside>
                  <aside>
                    <label for="senha"><p>Senha:</p></label>
                    <div class="formInputRegistro"><MdOutlinePassword /><input name="senha" id="senha" type={showPassword ? "text" : "password"} placeholder="Digite sua senha"/>
                      <button type="button" className="buttonSenha" onClick={togglePasswordVisibility}>
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </aside>
                </article>
              </section>
              <section className="infosTwo">
              <aside>
                    <label for="cep"><p>CEP:</p></label>
                    <div class="formInputRegistro"><FaSearchLocation /><input name="cep" id="cep" type="text" placeholder="Digite seu CEP"/></div>
                  </aside>
                  <aside>
                    <label for="cidade"><p>Cidade:</p></label>
                    <div class="formInputRegistro"><FaCity /><input name="cidade" id="cidade" type="text" placeholder="Digite sua cidade"/></div>
                  </aside>
                  <aside>
                    <label for="bairro"><p>Bairro:</p></label>
                    <div class="formInputRegistro"><FaMapLocationDot /><input name="bairro" id="bairro" type="text" placeholder="Digite seu bairro"/></div>
                  </aside>
                  <aside>
                    <label for="logradouro"><p>Logradouro:</p></label>
                    <div class="formInputRegistro"><FaLocationDot /><input name="logradouro" id="logradouro" type="text" placeholder="Digite seu logradouro"/></div>
                  </aside>
                  <aside>
                    <label for="complemento"><p>Complemento:</p></label>
                    <div class="formInputRegistro"><CiCompass1 /><input name="complemento" id="complemento" type="text" placeholder="Complemento"/></div>
                  </aside>
                  <aside>
                    <label for="numero"><p>Número:</p></label>
                    <div class="formInputRegistro"><PiListNumbersFill /><input name="numero" id="numero" type="text" placeholder="Número"/></div>
                  </aside>
                  <input type="submit" value="Registrar"/>
              </section>
            </form>
        </main>
      <Footer corTexto="#fff" corBackground="#6f5f40" corSecundaria="#fff"/>
    </div>
  );
}
