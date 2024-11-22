import {
  criarProduto,
  listarProdutos,
  obterProdutoPorId,
  atualizarProduto,
  deletarProduto,
} from "../services/produtoService.js";

export const criarProdutoController = async (req, res) => {
  const {
    nome,
    preco,
    estoque,
    descricao,
    tituloInformacao,
    visibilidade,
    categoriaId,
    informacao,
    cores,
  } = req.body;

  const imagens = req.files ? req.files.map((file) => file.path) : []; // Imagens como array vazio se não houver arquivos

  try {
    const produto = await criarProduto({
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      descricao,
      tituloInformacao,
      visibilidade: visibilidade === "true", // Converte visibilidade para booleano
      informacao,
      imagens,
      categoriaId: parseInt(categoriaId), // Certifique-se que é um número
      cores: Array.isArray(cores)
        ? cores.map((cor) => parseInt(cor))
        : [parseInt(cores)], // Transforma em array se for uma única cor
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

  console.log("files", req.files);
  console.log("body", req.body);

  // Processar imagens atuais (URLs) enviadas pelo frontend
  const imagensAtuais = req.body.imagensAtuais
    ? Array.isArray(req.body.imagensAtuais)
      ? req.body.imagensAtuais
      : [req.body.imagensAtuais]
    : [];

  // Processar novas imagens (arquivos enviados pelo multer)
  const novasImagens = req.files ? req.files.map((file) => file.path) : [];

  console.log("Imagens atuais recebidas:", imagensAtuais);
  console.log("Novas imagens recebidas:", novasImagens);

  try {
    // Valida o produtoId
    const id = parseInt(produtoId);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID do produto inválido" });
    }

    // Combina as imagens atuais e novas
    const imagens = [
      ...(Array.isArray(imagensAtuais) ? imagensAtuais : []),
      ...(Array.isArray(novasImagens) ? novasImagens : []),
    ];

    // Atualiza o produto
    const produtoAtualizado = await atualizarProduto(id, {
      ...req.body,
      imagens,
    });

    // Retorna o produto atualizado
    res.json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar produto:", {
      mensagem: error.message,
      stack: error.stack,
      parametros: req.body,
    });

    res.status(400).json({
      error: "Erro ao atualizar o produto. Verifique os dados enviados.",
    });
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
