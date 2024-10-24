import React, { useState } from "react";
import "./styles.css";
import { FaTrash, FaPencilAlt, FaCheck } from "react-icons/fa";

const UsuarioCartao = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [userInfo, setUserInfo] = useState({
        nome: "nome",
        email: "email",
        senha: "senha"
    });

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    return (
        <section className="usuarioCartao">
            <article className="CabecalhoUser">
                <aside>UserFig</aside>
                <aside className="buttonGroup">
                    <button className="buttonUsers" onClick={toggleEdit}>
                        {isEditable ? <FaCheck /> : <FaPencilAlt />}
                    </button>
                    <button className="buttonUsers"><FaTrash /></button>
                </aside>
            </article>
            <article>
                <label>
                    Nome: <input 
                        type="text" 
                        name="nome" 
                        value={userInfo.nome} 
                        onChange={handleChange} 
                        readOnly={!isEditable} 
                    />
                </label>
            </article>
            <article>
                <label>
                    Email: <input 
                        type="text" 
                        name="email" 
                        value={userInfo.email} 
                        onChange={handleChange} 
                        readOnly={!isEditable} 
                    />
                </label>
            </article>
            <article>
                <label>
                    Senha: <input 
                        type="text" 
                        name="senha" 
                        value={userInfo.senha} 
                        onChange={handleChange} 
                        readOnly={!isEditable} 
                    />
                </label>
            </article>
        </section>
    );
};

export default UsuarioCartao;