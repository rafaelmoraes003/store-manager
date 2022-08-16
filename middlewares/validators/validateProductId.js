const productsModel = require('../../models/productsModel');

const validateProductId = (req, res, next) => {
  const isIdValid = req.body.every(({ productId }) => productId);

  if (!isIdValid) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const validateProductIdExistence = async (req, res, next) => {
  let isBodyValid = true;

  await Promise.all(req.body.map(async ({ productId }) => {
    const product = await productsModel.getById(productId);
    if (!product) {
      isBodyValid = false;
    }
  }));

  if (!isBodyValid) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateProductId,
  validateProductIdExistence,
};