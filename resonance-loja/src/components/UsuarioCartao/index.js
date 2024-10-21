import React from "react";
import "./styles.css";

const UsuarioCartao = () => {
    return (
    <section className="usuarioCartao">
        <article className="CabecalhoUser">
            <aside>UserFig</aside>
            <aside>
                <button>Editar</button>
                <button>Excluir</button>
            </aside>
        </article>
        <article>
            <label>
                Nome: <input type="text" value="nome"/>
            </label>
        </article>
        <article>
            <label>
                Email: <input type="text" value="email" />
            </label>
        </article>
        <article>
            <label>
                Senha: <input type="text" value="senha"/>
            </label>
        </article>
    </section>
  );
};

export default UsuarioCartao;
