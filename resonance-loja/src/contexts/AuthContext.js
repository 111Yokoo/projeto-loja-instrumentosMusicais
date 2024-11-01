import React, { createContext, useState, useEffect } from "react";
import api from "../services/api"; // Axios configurado

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário já está logado via token no localStorage
    const loadUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Adiciona o token de autenticação para todas as requisições
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${parsedUser.token}`;
      }
      setLoading(false);
    };
    loadUserFromLocalStorage();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      const userData = {
        ...response.data.user, // Mantém os dados do usuário
        token: response.data.token, // Inclui o token da resposta
      };

      setUser(userData); // Armazena no estado
      localStorage.setItem("user", JSON.stringify(userData)); // Armazena no localStorage

      // Define o token de autenticação para todas as requisições subsequentes
      api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // para tratar o erro na UI
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove o token do localStorage
    delete api.defaults.headers.common["Authorization"]; // Remove o cabeçalho global
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
