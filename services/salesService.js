const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { code: 200, data: sales };
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);

  if (!sales.length) {
    return { error: { code: 404, message: 'Sale not found' } };
  }

  return { code: 200, data: sales };
};

module.exports = {
  getAll,
  getById,
};