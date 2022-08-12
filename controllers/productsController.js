const productsService = require('../services/productsService');

const serverErrorMessage = { code: 500, message: 'Server error.' };

const getAll = async (_req, res, next) => {
  try {
    const { code, data } = await productsService.getAll();
    res.status(code).json(data);
  } catch (error) {
    next(serverErrorMessage);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, code, data } = await productsService.getById(id);
    if (error) return res.status(error.code).json({ message: error.message });
    return res.status(code).json(data);
  } catch (error) {
    next(serverErrorMessage);
  }
};

const create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const product = await productsService.create(name);
    return res.status(product.code).json({
      id: product.id,
      name: product.name,
    });
  } catch (error) {
    next(serverErrorMessage);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const { error, code, data } = await productsService.update(id, name);
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(code).json(data);
  } catch (error) {
    next(serverErrorMessage);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};