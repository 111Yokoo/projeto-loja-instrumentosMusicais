import React, { useState, useEffect,useContext } from "react";
import "../styles/perfil.css";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Compra from "../components/Compra";
import ModalCompra from "../components/ModalCompra";
import { IoExit } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import api from "../services/api";

export default function Perfil() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
    cep: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    numero: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const handleCompraClick = (compra) => {
    setSelectedCompra(compra);
  };

  const handleCloseModal = () => {
    setSelectedCompra(null);
  };

  // Função para buscar os dados do usuário na API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/perfil`);
        setUserData({
          nome: response.data.nome || "",
          email: response.data.email || "",
          senha: response.data.senha || "",
          telefone: response.data.telefone || "",
          cpf: response.data.cpf || "",
          cep: response.data.endereco.cep || "",
          cidade: response.data.endereco.cidade || "",
          bairro: response.data.endereco.bairro || "",
          logradouro: response.data.endereco.logradouro || "",
          complemento: response.data.endereco.complemento || "",
          numero: response.data.endereco.numero || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData(); // Chama a função quando o componente for montado
  }, []);

  // Função para salvar as alterações no perfil
  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário, caso o botão de salvar seja dentro de um <form>
    setError(""); // Reseta qualquer mensagem de erro anterior
    setSuccessMessage(""); // Reseta a mensagem de sucesso

    try {
      await api.patch("/perfil", userData); // Atualiza os dados do usuário na API
      setSuccessMessage("Perfil atualizado com sucesso!"); // Exibe a mensagem de sucesso
      setIsEditable(false); // Desativa o modo de edição após salvar
    } catch (error) {
      // Lida com o erro, mostrando uma mensagem específica caso esteja disponível
      setError(
        error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente."
      );
    }
  };

  // Função para lidar com a mudança nos inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        // Inicia o efeito de fade-out após 5 segundos
        setFadeOut(true);

        // Após o tempo de fade-out, limpa a mensagem
        setTimeout(() => {
          if (successMessage) {
            setSuccessMessage(""); // Limpa a mensagem de sucesso
          }
          if (error) {
            setError(""); // Limpa a mensagem de erro
          }
        }, 500); // Tempo que a animação de fade-out dura (0.5s)
      }, 2500); // Tempo para a mensagem desaparecer (5 segundos)

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [successMessage, error]);
  return (
    <div className="perfil">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Minha conta</h2>
          <div className="linksPerfil">
            <a href="#comprasAntigas"><FaShoppingBag /></a>
            <button className="buttonExit"><IoExit /></button>
          </div>
        </section>
        <section className="infoConta">
          <h2>Informações da conta</h2>
          <div>
            {successMessage && (
              <div
                className={`statusMessage success ${fadeOut ? "fadeOut" : ""}`}
              >
                <p>{successMessage}</p>
              </div>
            )}
            {error && (
              <div className={`statusMessage error ${fadeOut ? "fadeOut" : ""}`}>
                <p>{error}</p>
              </div>
            )}
          </div>
          <article className="infoEdit">
            <label>
              Nome
              <input
                type="text"
                name="nome"
                value={userData.nome}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={userData.email}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Senha
              <div className="inputPasswordPerfil">
                <input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  value={userData.senha}
                  disabled={!isEditable}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="buttonSenhaLogin"
                  onClick={togglePasswordVisibility}
                  disabled={!isEditable}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </label>
            <label>
              Telefone
              <input
                type="text"
                name="telefone"
                value={userData.telefone}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              CPF
              <input
                type="text"
                name="cpf"
                value={userData.cpf}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              CEP
              <input
                type="text"
                name="cep"
                value={userData.cep}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Cidade
              <input
                type="text"
                name="cidade"
                value={userData.cidade}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Bairro
              <input
                type="text"
                name="bairro"
                value={userData.bairro}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Logradouro
              <input
                type="text"
                name="logradouro"
                value={userData.logradouro}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Complemento
              <input
                type="text"
                name="complemento"
                value={userData.complemento}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <label id="comprasAntigas">
              Número
              <input
                type="text"
                name="numero"
                value={userData.numero}
                disabled={!isEditable}
                onChange={handleInputChange}
              />
            </label>
            <button
              className="buttonPerfilEdit"
              onClick={isEditable ? handleSaveChanges : toggleEditMode}
            >
              <strong>{isEditable ? "Salvar" : "Editar informações"}</strong>
            </button>
          </article>
        </section>
        <hr />
        <section className="compras">
          {user && user.role === "ADMIN" ? (
            <>
            </>
          ) :
            <>
              <h2>Histórico de compras</h2>
              <article className="historicoCompras">
                <Compra preco="100" nomeUsuario="Fulano" onClick={() => handleCompraClick({ idCompra: "idCompra", imagem: "imagem", nomes: "nomes", precos: "preços", valorTotal: "valoTotal" })} />
                <Compra preco="200" nomeUsuario="Beltrano" onClick={() => handleCompraClick({ idCompra: "idCompra", imagem: "imagem", nomes: "nomes", precos: "preços", valorTotal: "valoTotal" })} />
              </article>
            </>
          }
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />

      {selectedCompra && (
        <ModalCompra
          compra={selectedCompra}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
