import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate("/"); 
    } catch (error) {
      // Verifica se a API retornou um erro com uma mensagem específica
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };


  return (
    <div style={{backgroundImage: `url(${Fundo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'}} className="fundo login">
      <Header cor="#121212"/>
        <main>
            <form onSubmit={handleLogin}>
              <section className="main">
                <section>
                  <img src={Logo} alt="Logo Resonance"/>
                </section>
                <section className="form">
                  <article className="formImput">
                    <label for="email"><strong>Email:</strong></label>
                    <aside className="input">
                      <span>
                        <IoIosMail />
                      </span><input id="email" name="email" type="text" placeholder="Digite seu email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    </aside>
                  </article>
                  <article className="formImput">
                    <label for="senha"><strong>Senha:</strong></label>
                    <aside className="input">
                      <span>
                        <MdOutlinePassword />
                      </span><input name="senha" id="senha" type={showPassword ? "text" : "password"} placeholder="Digite seu senha" value={password} required onChange={(e) => setPassword(e.target.value)}/>
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
