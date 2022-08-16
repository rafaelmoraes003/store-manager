const express = require('express');
const salesController = require('../controllers/salesController');
const validateProductId = require('../middlewares/validators/validateProductId');
const validateQuantity = require('../middlewares/validators/validateQuantity');

const sales = express.Router();

sales.get('/', salesController.getAll);
sales.get('/:id', salesController.getById);
sales.delete('/:id', salesController.deleteSale);

sales.use(
  validateProductId.validateProductId,
  validateProductId.validateProductIdExistence,
  validateQuantity.validateQuantity,
  validateQuantity.validateQuantityValue,
);

sales.post('/', salesController.createSale);
// sales.put('/:id', salesController.updateSale);

module.exports = sales;