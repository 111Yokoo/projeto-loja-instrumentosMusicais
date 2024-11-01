import React, { useState, useContext, useEffect } from "react";
import "../styles/criacao.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { FaTrash,  FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function CriarCores() {
  const [nomeCor, setNomeCor] = useState("");
  const [codigoHex, setCodigoHex] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [getCores, setGetCores] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);

  const handleAddCor = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", nomeCor);
    formData.append("hexadecimal", codigoHex);

    if (!user || user.role !== "ADMIN") {
      setError("Você precisa estar logado como admin para criar uma cor.");
      return;
    }

    try {
      await api.post("/cores", formData);
      setSuccessMessage("Cor adicionada com sucesso!");
      setNomeCor("");
      setCodigoHex("");
      fetchCores();
    } catch (error) {
      setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
    }
  };

  const fetchCores = async () => {
    try {
      const isAdmin = user?.role === "ADMIN";
      const response = await api.get(`/cores?admin=${isAdmin}`);
      setGetCores(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    if (editableIndex === index) {
      const corAtualizada = getCores[index];
      api.put(`/cores/${corAtualizada.id}`, corAtualizada)
        .then(() => {
          setSuccessMessage("Cor atualizada com sucesso!");
          setEditableIndex(null);
          fetchCores();
        })
        .catch(error => setError(error.response?.data?.message || "Erro ao atualizar."));
    } else {
      setEditableIndex(index);
    }
  };

  useEffect(() => {
    fetchCores();
  }, [user?.role]);

  return (
    <div className="criacao">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Cadastro de Cor</h2>
        </section>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        {loading && <p>Carregando...</p>}
        <section className="sessaoForms">
          <form onSubmit={handleAddCor}>
            <div className="infosCriacao">
              <article className="inputGroupCriacao">
                <div className="inputContainer">
                  <label>Nome da Cor</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🎨</span>
                    <input
                      type="text"
                      name="nomeCor"
                      value={nomeCor}
                      onChange={(e) => setNomeCor(e.target.value)}
                      placeholder="Nome da Cor"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Código Hexadecimal</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">#</span>
                    <input
                      type="text"
                      name="codigoHex"
                      value={codigoHex}
                      onChange={(e) => setCodigoHex(e.target.value)}
                      placeholder="Código Hexadecimal"
                      required
                    />
                  </div>
                </div>
                <input type="submit" value="Criar Cor" />
              </article>
            </div>
          </form>
        </section>
        <section className="listagemMap">
          <h2>Cores:</h2>
          <section className="listagemTypes">
            {getCores.map((cor, index) => (
              <article className="getAllTypes" key={cor.id}>
                <div className="typesOne">
                  <div style={{background: `#${cor.hexadecimal}`, width: "50px", height: "50px", borderRadius: "50%"}}></div>
                  <div className="typeInputs">
                    <h3>
                      Nome: 
                      <input
                        type="text"
                        value={editableIndex === index ? cor.nome : cor.nome}
                        onChange={(e) => {
                          if (editableIndex === index) {
                            const newCores = [...getCores];
                            newCores[index].nome = e.target.value;
                            setGetCores(newCores);
                          }
                        }}
                        disabled={editableIndex !== index}
                      />
                    </h3>
                    <p>
                      Hexadecimal: # 
                      <input
                        type="text"
                        value={editableIndex === index ? cor.hexadecimal : cor.hexadecimal}
                        onChange={(e) => {
                          if (editableIndex === index) {
                            const newCores = [...getCores];
                            newCores[index].hexadecimal = e.target.value;
                            setGetCores(newCores);
                          }
                        }}
                        disabled={editableIndex !== index}
                      />
                    </p>
                  </div>
                </div>
                <div className="typesTwo">
                  <button type="button" onClick={() => handleEdit(index)}>
                    {editableIndex === index ? <FaCheck /> : <FaPencil />}
                  </button>
                  <button>
                    <FaTrash />
                  </button>
                </div>
              </article>
            ))}
          </section>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
