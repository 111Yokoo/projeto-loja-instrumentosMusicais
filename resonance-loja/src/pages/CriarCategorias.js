import React, { useState, useEffect, useContext } from "react";
import "../styles/criacao.css"; // Use o mesmo CSS se necessário
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrash, FaCheck} from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function CriarCategorias() {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddCategoria = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nomeCategoria);

    try {
      await api.post("/categorias", formData);
      setSuccessMessage("Categoria adicionada com sucesso!");
      setNomeCategoria("");
      fetchCategorias(); // Atualiza a lista após a adição
    } catch (error) {
      setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    if (editableIndex === index) {
      const categoriaAtualizada = categorias[index];
      api.put(`/categorias/${categoriaAtualizada.id}`, categoriaAtualizada)
        .then(() => {
          setSuccessMessage("Categoria atualizada com sucesso!");
          setEditableIndex(null);
          fetchCategorias();
        })
        .catch(error => setError(error.response?.data?.message || "Erro ao atualizar."));
    } else {
      setEditableIndex(index);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="criacao">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Cadastro de Categoria</h2>
        </section>
        <div style={{width: "100%", textAlign: 'center'}}>
          {/* Faixa de sucesso (verde) */}
          {successMessage && (
            <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', marginBottom: '10px' }}>
              {successMessage}
            </div>
          )}

          {/* Faixa de erro (vermelha) */}
          {error && (
            <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          {/* Mensagem de carregamento */}
          {loading && <p>Carregando...</p>}
        </div>
        <section className="sessaoForms">
          <form onSubmit={handleAddCategoria}>
            <div className="infosCriacao">
              <article className="inputGroupCriacao">
                <div className="inputContainer">
                  <label>Nome da Categoria</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">📦</span>
                    <input
                      type="text"
                      name="nomeCategoria"
                      value={nomeCategoria}
                      onChange={(e) => setNomeCategoria(e.target.value)}
                      placeholder="Nome da Categoria"
                      required
                    />
                  </div>
                </div>
                <input type="submit" value="Criar Categoria" />
              </article>
            </div>
          </form>
        </section>
        <section className="listagemMap">
          <h2>Categorias:</h2>
          <section className="listagemTypes">
            {categorias.map((categoria, index) => (
              <article className="getAllTypes" key={categoria.id}>
                <div className="typesOne">
                  <div className="typeInputs">
                    <h3>
                      Nome:
                      <input
                        type="text"
                        value={editableIndex === index ? categoria.nome : categoria.nome}
                        onChange={(e) => {
                          if (editableIndex === index) {
                            const newCategorias = [...categorias];
                            newCategorias[index].nome = e.target.value;
                            setCategorias(newCategorias);
                          }
                        }}
                        disabled={editableIndex !== index}
                      />
                    </h3>
                  </div>
                </div>
                <div className="typesTwo">
                  <button type="button" onClick={() => handleEdit(index)}>
                    {editableIndex === index ? <FaCheck /> : <FaPencil />}
                  </button>
                  <button type="button" onClick={() => {
                    api.delete(`/categorias/${categoria.id}`)
                      .then(() => {
                        setSuccessMessage("Categoria deletada com sucesso!");
                        fetchCategorias(); // Atualiza a lista após a deleção
                      })
                      .catch(error => setError(error.response?.data?.message || "Erro ao deletar."));
                  }}>
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
