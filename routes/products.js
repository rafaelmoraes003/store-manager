const express = require('express');
const productsController = require('../controllers/productsController');
const { validateName } = require('../middlewares/validateName');

const products = express.Router();

products.get('/', productsController.getAll);
products.get('/:id', productsController.getById);
products.post('/', validateName, productsController.create);

module.exports = products;