import React, { useState } from "react";
import "../styles/login.css";
import "../styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../assets/images/Logo.png"
import Fundo from "../assets/images/Fundo-Login-Signup.png"
import { IoIosMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  return (
    <div style={{backgroundImage: `url(${Fundo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'}} className="fundo login">
      <Header/>
        <main>
            <form action="" method="">
              <section className="main">
                <section>
                  <img src={Logo} />
                </section>
                <section className="form">
                  <article className="formImput">
                    <label for="email"><strong>Email:</strong></label>
                    <aside className="input">
                      <span>
                        <IoIosMail />
                      </span><input id="email" name="email" type="text" placeholder="Digite seu email"/>
                    </aside>
                  </article>
                  <article className="formImput">
                    <label for="senha"><strong>Senha:</strong></label>
                    <aside className="input">
                      <span>
                        <MdOutlinePassword />
                      </span><input name="senha" id="senha" type={showPassword ? "text" : "password"} placeholder="Digite seu senha"/>
                      <button type="button" className="buttonSenhaLogin" onClick={togglePasswordVisibility}>
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </aside>
                  </article>
                  <article className="submit">
                  <input type="submit" value="Entrar" />
                  <p className="registrar">Não tem conta? <a href="/registro">Faça seu cadastro!</a></p>
                  </article>
                </section>
              </section>
            </form>
        </main>
      <Footer corTexto="#fff" corBackground="#6f5f40" corSecundaria="#fff"/>
    </div>
  );
}
