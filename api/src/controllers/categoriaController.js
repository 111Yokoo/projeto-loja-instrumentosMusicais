import {
    listarCategorias,
    criarCategoria,
    obterCategoriaPorId,
    atualizarCategoria,
    deletarCategoria,
  } from "../services/categoriaService.js";
  
  export const obterCategoriasController = async (req, res) => {
    try {
      const categorias = await listarCategorias();
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const criarCategoriaController = async (req, res) => {
    const data = req.body;
  
    try {
      const categoria = await criarCategoria(data);
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const obterCategoriaController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const categoria = await obterCategoriaPorId(parseInt(id));
      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const atualizarCategoriaController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
  
    try {
      const categoriaAtualizada = await atualizarCategoria(parseInt(id), data);
      if (!categoriaAtualizada) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
      return res.status(200).json(categoriaAtualizada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const deletarCategoriaController = async (req, res) => {
    const { id } = req.params;
  
    try {
      await deletarCategoria(parseInt(id));
      return res.status(204).send(); // Categoria deletada com sucesso
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  