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

module.exports = {
  getAll,
  getById,
  create,
};