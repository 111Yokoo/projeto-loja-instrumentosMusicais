import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import DetalhesProduto from "../pages/DetalhesProduto";
import Carrinho from "../pages/Carrinho";
import Perfil from "../pages/Perfil";
import Usuarios from "../pages/Usuarios";
import Sobrenos from "../pages/Sobrenos";
import ListagemProdutos from "../pages/ListagemProdutos";
import ListagemVendas from "../pages/ListagemVendas";
import CriarProdutos from "../pages/CriarProdutos";
import CriarCategorias from "../pages/CriarCategorias";
import CriarCores from "../pages/CriarCores";


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/sobrenos" element={<Sobrenos />} />
        <Route path="/produtos/:id" element={<ListagemProdutos />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />

        {/* Rotas protegidas (apenas usuários logados) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Rotas protegidas de admin (apenas administradores) */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin/listagemVendas" element={<ListagemVendas />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/criarProdutos" element={<CriarProdutos />} />
          <Route path="/admin/criarCategorias" element={<CriarCategorias />} />
          <Route path="/admin/criarCores" element={<CriarCores />} />
        </Route>
      </Routes>
    </Router>
  );
}
