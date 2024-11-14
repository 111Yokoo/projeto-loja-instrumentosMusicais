import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editarProdutos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nomeProduto, setNomeProduto] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tituloInformacao, setTituloInformacao] = useState("");
    const [informacao, setInformacao] = useState("");
    const [coresSelecionadas, setCoresSelecionadas] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState();
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const [cores, setCores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Ativa o loading enquanto busca os dados
                const produtoResponse = await api.get(`/produtos/${id}`);
                const produto = produtoResponse.data;

                setNomeProduto(produto.nome);
                setDescricao(produto.descricao);
                setTituloInformacao(produto.tituloInformacao);
                setInformacao(produto.informacao);
                setPreco(produto.preco);
                setEstoque(produto.estoque);
                setCategoria(produto.categoriaId);
                setCoresSelecionadas(produto.cores || []);
                setCurrentImages(produto.imagens || []);

                const coresResponse = await api.get("/cores");
                setCores(coresResponse.data);

                const categoriasResponse = await api.get("/categorias");
                setCategorias(categoriasResponse.data);
            } catch (error) {
                setError(error.response?.data?.message || "Erro ao carregar o produto.");
            } finally {
                setLoading(false); // Desativa o loading após a resposta
            }
        };
        fetchData();
    }, [id]);

    const handleImageChange = (event) => {
        setSelectedImages(event.target.files);
    };

    const removeCurrentImage = (index) => {
        setCurrentImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const excluirProduto = async () => {
        setLoading(true); // Ativa o loading ao excluir
        try {
            await api.delete(`/produtos/${id}`);
            setSuccessMessage("Produto excluído com sucesso!");
            setTimeout(() => navigate("/produtos"), 1500); // Redireciona após 1,5 segundo
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao excluir o produto.");
        } finally {
            setLoading(false); // Desativa o loading após a resposta
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Ativa o loading ao submeter os dados
        const formData = new FormData();
        formData.append("id", id);
        formData.append("nome", nomeProduto);
        formData.append("preco", parseFloat(preco));
        formData.append("estoque", estoque);
        formData.append("descricao", descricao);
        formData.append("tituloInformacao", tituloInformacao);
        formData.append("informacao", informacao);
        formData.append("categoriaId", Number(categoria));
        coresSelecionadas.forEach((corId) => formData.append("cores", parseInt(corId, 10)));
        currentImages.forEach((imageUrl) => formData.append("imagens", imageUrl));
        Array.from(selectedImages).forEach((imagem) => formData.append("imagens", imagem));

        try {
            await api.put(`/produtos/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccessMessage("Produto atualizado com sucesso!");
            navigate(`/produtos/${id}`);
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao atualizar o produto.");
        } finally {
            setLoading(false); // Desativa o loading após a resposta
        }
    };

    return (
        <div className="criacao">
            <Header cor="#121212" />
            <main>
                <section className="titlePerfil">
                    <h2>Editar Produto</h2>
                </section>
                <div style={{ width: "100%", textAlign: "center" }}>
                    {/* Faixa de sucesso (verde) */}
                    {successMessage && (
                        <div
                            style={{
                                backgroundColor: "green",
                                color: "white",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            {successMessage}
                        </div>
                    )}

                    {/* Faixa de erro (vermelha) */}
                    {error && (
                        <div
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {/* Mensagem de carregamento */}
                    {loading && <p>Carregando...</p>}
                </div>
                <section className="sessaoForms">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <button type="button" onClick={excluirProduto} disabled={loading}>🗑️ Excluir Produto</button>
                        </div>
                        <div className="infosCriacao">
                            <article className="inputGroupCriacao">
                                {/* Formulário de Edição */}
                                <div className="inputContainer">
                                    <label>Nome do Produto</label>
                                    <div className="inputWithIcon">
                                        <span className="inputIcon">🔍</span>
                                        <input
                                            type="text"
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
                                        <span className="inputIcon">📄</span>
                                        <textarea
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                            placeholder="Descrição"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="inputContainer">
                                    <label>Título Informação</label>
                                    <div className="inputWithIcon">
                                        <span className="inputIcon">🔤</span>
                                        <input
                                            type="text"
                                            value={tituloInformacao}
                                            onChange={(e) => setTituloInformacao(e.target.value)}
                                            placeholder="Título Informação"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="inputContainer">
                                    <label>Informação</label>
                                    <div className="inputWithIcon">
                                        <span className="inputIcon">ℹ️</span>
                                        <textarea
                                            value={informacao}
                                            onChange={(e) => setInformacao(e.target.value)}
                                            placeholder="Informação"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="inputContainer">
                                    <label>Selecionar Cores</label>
                                    <div className="coresInputSelects">
                                        {cores.map((cor) => (
                                            <div key={cor.id}>
                                                <input
                                                    type="checkbox"
                                                    value={cor.id}
                                                    checked={coresSelecionadas.some((selected) => selected.id === cor.id)}
                                                    onChange={() => {
                                                        setCoresSelecionadas((prev) =>
                                                            prev.some((selected) => selected.id === cor.id)
                                                                ? prev.filter((selected) => selected.id !== cor.id)
                                                                : [...prev, cor]
                                                        );
                                                    }}
                                                />
                                                <label
                                                    style={{
                                                        background: `#${cor.hexadecimal}`,
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "50%",
                                                    }}
                                                ></label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="inputContainer">
                                    <label>Categoria</label>
                                    <div className="inputWithIcon">
                                        <span className="inputIcon">📦</span>
                                        <select
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
                                            value={estoque}
                                            onChange={(e) => setEstoque(Number(e.target.value))}
                                            placeholder="Quantidade"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="inputContainer">
                                    <label>Imagens Atuais</label>
                                    <div className="currentImagePreview">
                                        {currentImages.length > 0 ? (
                                            currentImages.map((imageUrl, index) => (
                                                <div key={index} className="imageContainer">
                                                    <img src={imageUrl} alt={`Imagem ${index}`} className="imagensEditarProduto" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCurrentImage(index)}
                                                    >
                                                        Remover
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Nenhuma imagem atual</p>
                                        )}
                                    </div>
                                </div>

                                <div className="inputContainer">
                                    <label>Selecionar Novas Imagens</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {selectedImages.length > 0 && (
                                        <div className="imagePreview">
                                            <p>Imagens selecionadas:</p>
                                            <ul>
                                                {Array.from(selectedImages).map((image, index) => (
                                                    <li key={index}>{image.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <input type="submit" value="Atualizar Produto" disabled={loading} />
                            </article>
                        </div>
                    </form>
                </section>
            </main>
            <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
        </div>
    );
}
