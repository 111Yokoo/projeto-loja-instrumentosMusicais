import {
  criarProduto,
  listarProdutos,
  obterProdutoPorId,
  atualizarProduto,
  deletarProduto,
} from "../services/produtoService.js";

// Controller para criar um novo produto com imagem
export const criarProdutoController = async (req, res) => {
  const { nome, preco, estoque, descricao, tituloInformacao, visibilidade, informacao } = req.body;
  const imagens = req.files ? req.files.map((file) => file.path) : [];

  try {
    // Chama o serviço para criar o produto
    const produto = await criarProduto({
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      descricao,
      tituloInformacao,
      visibilidade,
      informacao,
      imagens,
    });
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const obterProdutos = async (req, res) => {
  try {
    const produtos = await listarProdutos();
    return res.json(produtos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const obterProduto = async (req, res) => {
  const { produtoId } = req.params;

  try {
    const produto = await obterProdutoPorId(parseInt(produtoId));
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(produto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const editarProduto = async (req, res) => {
  const { produtoId } = req.params;
  const dadosAtualizados = req.body;

  try {
    const produto = await atualizarProduto(parseInt(produtoId), dadosAtualizados);
    res.json(produto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const removerProduto = async (req, res) => {
  const { produtoId } = req.params;

  try {
    await deletarProduto(parseInt(produtoId));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
