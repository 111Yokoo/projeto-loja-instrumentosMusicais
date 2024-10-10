import {
    listarCores,
    criarCor,
    obterCorPorId,
    atualizarCor,
    deletarCor,
  } from "../services/corService.js";
  
  export const obterCoresController = async (req, res) => {
    try {
      const cores = await listarCores();
      return res.status(200).json(cores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const criarCorController = async (req, res) => {
    const data = req.body;
  
    try {
      const cor = await criarCor(data);
      return res.status(201).json(cor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const obterCorController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const cor = await obterCorPorId(parseInt(id));
      if (!cor) {
        return res.status(404).json({ message: "Cor não encontrada" });
      }
      return res.status(200).json(cor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const atualizarCorController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
  
    try {
      const corAtualizada = await atualizarCor(parseInt(id), data);
      if (!corAtualizada) {
        return res.status(404).json({ message: "Cor não encontrada" });
      }
      return res.status(200).json(corAtualizada);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  export const deletarCorController = async (req, res) => {
    const { id } = req.params;
  
    try {
      await deletarCor(parseInt(id));
      return res.status(204).send(); // Cor deletada com sucesso
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  