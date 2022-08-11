const express = require('express');
const productsController = require('../controllers/productsController');

const products = express.Router();

products.get('/', productsController.getAll);
products.get('/:id', productsController.getById);
products.post('/', productsController.create);

module.exports = products;