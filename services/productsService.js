const productModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productModel.getAll();

  return { code: 200, data: products };
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { error: { code: 404, message: 'Product not found' } };

  return { code: 200, data: product };
};

const create = async (productName) => {
  const { id, name } = await productModel.create(productName);
  return { code: 201, id, name };
};

const update = async (id, name) => {
  const checkIfProductExists = await productModel.getById(id);

  if (!checkIfProductExists) {
    return { error: { code: 404, message: 'Product not found' } };
  }

  const response = await productModel.update(id, name);
  return { code: 200, data: response };
};

const exclude = async (id) => {
  const checkIfProductExists = await productModel.getById(id);

  if (!checkIfProductExists) {
    return { error: { code: 404, message: 'Product not found' } };
  }

  await productModel.exclude(id);
  return { code: 204 };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};