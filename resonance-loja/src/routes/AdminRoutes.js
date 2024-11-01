import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if(loading){
    return <p>Carregando...</p>;
  }

  return user && user.role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
