const express = require('express');
const salesController = require('../controllers/salesController');

const sales = express.Router();

sales.get('/', salesController.getAll);
sales.get('/:id', salesController.getById);

module.exports = sales;