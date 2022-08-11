const express = require('express');
const productsController = require('../controllers/productsController');

const products = express.Router();

products.get('/', productsController.getAll);
products.get('/:id', productsController.getById);

module.exports = products;