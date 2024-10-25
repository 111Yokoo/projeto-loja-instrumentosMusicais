import React, { useState } from "react";
import "../styles/criacao.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa";

export default function CriarProdutos() {
  const [logado, setLogado] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="criacao">
      <Header cor="#121212" />
      <main>
        <section className="titlePerfil">
          <h2>Cadastro Produto</h2>
        </section>
        <section className="sessaoForms">
          <form action="">
            {logado ? (
              <span className="carrinho" onClick={() => {}}>
                <FaTrash />
              </span>
            ) : (
              <div>trash</div>
            )}
            <div className="infosCriacao">
              <article className="inputGroupCriacao">
                {/* Inputs em flex-row com wrap */}
                <div className="inputContainer">
                  <label>Nome do Produto</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔍</span>
                    <input type="text" name="nomeProduto" placeholder="Nome do Produto" />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Descrição 1</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔍</span>
                    <textarea name="descricaoOne" placeholder="Descrição 1" />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Descrição 2</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔍</span>
                    <textarea name="descricaoTwo" placeholder="Descrição 2" />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Cor</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🎨</span>
                    <select name="cor">
                      <option value="" disabled selected>Selecione uma cor</option>
                      <option value="vermelho">Vermelho</option>
                      <option value="azul">Azul</option>
                      <option value="verde">Verde</option>
                      <option value="preto">Preto</option>
                    </select>
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Categoria</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">📦</span>
                    <select name="categoria">
                      <option value="" disabled selected>Selecione uma categoria</option>
                      <option value="eletronicos">Eletrônicos</option>
                      <option value="roupas">Roupas</option>
                      <option value="alimentos">Alimentos</option>
                      <option value="moveis">Móveis</option>
                    </select>
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Preço</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">💰</span>
                    <input type="text" name="preco" placeholder="Preço" />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Estoque</label>
                  <div className="inputWithIcon">
                    <span className="inputIcon">🔢</span>
                    <input type="number" name="estoque" placeholder="Quantidade" />
                  </div>
                </div>
                <div className="inputContainer">
                  <label>Selecionar Imagem</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  {selectedImage && (
                    <div className="imagePreview">
                      <img src={selectedImage} alt="Prévia" />
                    </div>
                  )}
                </div>
                <input type="submit" />
              </article>
            </div>
          </form>
        </section>
      </main>
      <Footer corTexto="#fff" corBackground="#121212" corSecundaria="#6f5f40" />
    </div>
  );
}
