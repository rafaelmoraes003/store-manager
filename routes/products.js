const express = require('express');
const productsController = require('../controllers/productsController');
const { validateName } = require('../middlewares/validators/validateName');

const products = express.Router();

products.get('/', productsController.getAll);
products.get('/search', productsController.getByName);
products.get('/:id', productsController.getById);
products.delete('/:id', productsController.exclude);

products.use(validateName);

products.post('/', productsController.create);
products.put('/:id', productsController.update);

module.exports = products;