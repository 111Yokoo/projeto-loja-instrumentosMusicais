import React, { useState, useEffect, useContext } from "react";
import "../styles/criacao.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function CriarProdutos() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tituloInformacao, setTituloInformacao] = useState("");
  const [informacao, setInformacao] = useState("");
  const [coresSelecionadas, setCoresSelecionadas] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]); // Alterado para suportar múltiplas imagens
  const [cores, setCores] = useState([7]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCores = async () => {
      try {
        const response = await api.get("/cores");
        setCores(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Erro ao carregar as cores.");
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Erro ao carregar as categorias.");
      }
    };

    fetchCores();
    fetchCategorias();
  }, []);

  const handleImageChange = (event) => {
    setSelectedImages(event.target.files); // Armazena as imagens selecionadas
  };

  const handleCorChange = (event) => {
    const value = event.target.value;
    setCoresSelecionadas((prev) => {
      if (prev.includes(value)) {
        return prev.filter(cor => cor !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Defina cores com o valor 7 para teste
    const coresParaTeste = [7];
  
    const formData = new FormData();
    formData.append("id", 3); // ID do produto (ajuste conforme necessário)
    formData.append("nome", nomeProduto);
    formData.append("preco", parseFloat(preco));
    formData.append("estoque", estoque);
    formData.append("descricao", descricao);
    formData.append("tituloInformacao", tituloInformacao);
    formData.append("visibilidade", true);
    formData.append("informacao", informacao);
    formData.append("categoriaId", Number(categoria));
    
    // Adiciona cores para teste
    coresParaTeste.forEach(corId => formData.append("cores", Number(corId)));
  
    // Adiciona as imagens, se houver
    Array.from(selectedImages).forEach((imagem) => {
      formData.append("imagens", imagem);
    });
  
    console.log('Dados a serem enviados:', Array.from(formData.entries())); // Verifique os dados
  
    try {
      await api.post("/produtos", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Mantém como FormData
        },
      });
      setSuccessMessage("Produto cadastrado com sucesso!");
  
      // Resetar os campos após o envio
      setNomeProduto("");
      setDescricao("");
      setTituloInformacao("");
      setInformacao("");
      setCoresSelecionadas([]);
      setCategoria("");
      setPreco("");
      setEstoque(0);
      setSelectedImages([]);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error.response);
      setError(error.response?.data?.message || "Erro ao cadastrar o produto.");
    }
  };

  return (
    <div className="criacao">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Cadastro Produto</h2>
        </section>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <section className="sessaoForms">
          <form onSubmit={handleSubmit}>
            <div className="infosCriacao">
              <article className="inputGroupCriacao">
                <div className="inputContainer">
                  <label>Nome do Produto</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔍</span>
                    <input
                      type="text"
                      name="nomeProduto"
                      value={nomeProduto}
                      onChange={(e) => setNomeProduto(e.target.value)}
                      placeholder="Nome do Produto"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Descrição</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔍</span>
                    <textarea
                      name="descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Descrição"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Titúlo informação</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔍</span>
                    <input
                      type="text"
                      name="tituloInformacao"
                      value={tituloInformacao}
                      onChange={(e) => setTituloInformacao(e.target.value)}
                      placeholder="Titulo Informacao"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Informação</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔍</span>
                    <textarea
                      name="informacao"
                      value={informacao}
                      onChange={(e) => setInformacao(e.target.value)}
                      placeholder="Informação"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Categoria</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">📦</span>
                    <select
                      name="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      required
                    >
                      <option value="" disabled>Selecione uma categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Preço</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">💰</span>
                    <input
                      type="text"
                      name="preco"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      placeholder="Preço"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Estoque</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔢</span>
                    <input
                      type="number"
                      name="estoque"
                      value={estoque}
                      onChange={(e) => setEstoque(Number(e.target.value))}
                      placeholder="Quantidade"
                      required
                    />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Selecionar Imagens</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {selectedImages.length > 0 && (
                    <div className="imagePreview">
                      {Array.from(selectedImages).map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt={`Prévia ${index}`} />
                      ))}
                    </div>
                  )}
                </div>
                <input type="submit" value="Cadastrar Produto" />
              </article>
            </div>
          </form>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
