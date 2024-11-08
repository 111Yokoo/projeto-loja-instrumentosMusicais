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
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    cpf: "",
    cep: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    numero: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData); // Log dos dados do formulário
    try {
      await api.post("/auth/registro", formData);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error); // Log do erro
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };


  return (
    <div style={{
      backgroundImage: `url(${Fundo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat-y',
      height: '100%'
    }} className="fundo">
      <Header cor="#121212" />
      <main className="registrar">
        <form className="formRegistro" onSubmit={handleSubmit} >
          <section className="infosOne">
            <img src={Logo} width="250px" alt="Logo Resonance" />
            <p className="tituloRegistrar">Seja bem vindo! Conclua seu cadastro para acessar nossa loja.</p>
            <article className="inputGroup">
              <aside>
                <label htmlFor="nome"><p>Nome:</p></label>
                <div className="formInputRegistro"><MdDriveFileRenameOutline /><input name="nome" id="nome" type="text" value={formData.nome} onChange={handleChange} required placeholder="Digite seu nome" /></div>
              </aside>
              <aside>
                <label htmlFor="email"><p>Email:</p></label>
                <div className="formInputRegistro"><IoMail /><input name="email" id="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Digite seu email" /></div>
              </aside>
              <aside>
                <label htmlFor="telefone"><p>Telefone:</p></label>
                <div className="formInputRegistro"><FaPhoneAlt /><input name="telefone" id="telefone" type="text" value={formData.telefone} onChange={handleChange} required placeholder="Digite seu telefone" /></div>
              </aside>
              <aside>
                <label htmlFor="cpf"><p>CPF:</p></label>
                <div className="formInputRegistro"><IoDocument /><input name="cpf" id="cpf" type="text" value={formData.cpf} onChange={handleChange} required placeholder="Digite seu CPF" /></div>
              </aside>
              <aside>
                <label htmlFor="senha"><p>Senha:</p></label>
                <div className="formInputRegistro">
                  <MdOutlinePassword />
                  <input
                    name="password" // Corrigido para 'password'
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Digite sua senha"
                  />
                  <button type="button" className="buttonSenha" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </aside>
            </article>
          </section>
          <section className="infosTwo">
            <aside>
              <label htmlFor="cep"><p>CEP:</p></label>
              <div className="formInputRegistro"><FaSearchLocation /><input name="cep" id="cep" type="text" value={formData.cep} onChange={handleChange} required placeholder="Digite seu CEP" /></div>
            </aside>
            <aside>
              <label htmlFor="cidade"><p>Cidade:</p></label>
              <div className="formInputRegistro"><FaCity /><input name="cidade" id="cidade" type="text" value={formData.cidade} onChange={handleChange} required placeholder="Digite sua cidade" /></div>
            </aside>
            <aside>
              <label htmlFor="bairro"><p>Bairro:</p></label>
              <div className="formInputRegistro"><FaMapLocationDot /><input name="bairro" id="bairro" type="text" value={formData.bairro} onChange={handleChange} required placeholder="Digite seu bairro" /></div>
            </aside>
            <aside>
              <label htmlFor="logradouro"><p>Logradouro:</p></label>
              <div className="formInputRegistro"><FaLocationDot /><input name="logradouro" id="logradouro" value={formData.logradouro} onChange={handleChange} required type="text" placeholder="Digite seu logradouro" /></div>
            </aside>
            <aside>
              <label htmlFor="complemento"><p>Complemento:</p></label>
              <div className="formInputRegistro"><CiCompass1 /><input name="complemento" id="complemento" type="text" value={formData.complemento} onChange={handleChange} required placeholder="Complemento" /></div>
            </aside>
            <aside>
              <label htmlFor="numero"><p>Número:</p></label>
              <div className="formInputRegistro"><PiListNumbersFill /><input name="numero" id="numero" type="text" value={formData.numero} onChange={handleChange} required placeholder="Número" /></div>
            </aside>
            <input type="submit" value="Registrar" />
          </section>
        </form>
      </main>
      <Footer corTexto="#fff" corBackground="#6f5f40" corSecundaria="#fff" />
    </div>
  );
}
