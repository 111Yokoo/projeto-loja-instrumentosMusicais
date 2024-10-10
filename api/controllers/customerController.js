import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../services/customerService.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar clientes",
    });
  }
};

export const createCustomerController = async (req, res) => {
  try {
    const newCustomer = await createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(500).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente" });
  }
};

export const updateCustomerController = async (req, res) => {
  try {
    const customer = await updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
};

export const deleteCustomerController = async (req, res) => {
  try {
    await deleteCustomer(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
};
