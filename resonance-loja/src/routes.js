import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import DetalhesProduto from "./pages/DetalhesProduto";
import Carrinho from "./pages/Carrinho";
import Perfil from "./pages/Perfil";
import Usuarios from "./pages/Usuarios";
import Contato from "./pages/Contato";
import Sobrenos from "./pages/Sobrenos";
import ListagemProdutos from "./pages/ListagemProdutos";
import ListagemVendas from "./pages/ListagemVendas";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sobrenos" element={<Sobrenos />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/produtos" element={<ListagemProdutos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin/listagemVendas" element={<ListagemVendas />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
      </Routes>
    </Router>
  );
}
