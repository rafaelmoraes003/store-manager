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

const createSale = async (saleArr) => {
  const { id } = await salesModel.createSale();
  
  await Promise.all(saleArr.map(({ productId, quantity }) => (
    salesModel.createSaleProduct(id, productId, quantity)
  )));

  const response = {
    id,
    itemsSold: saleArr,
  };

  return { code: 201, data: response };
};

const deleteSale = async (saleId) => {
  const doesSaleIdExists = await salesModel.getById(saleId);

  if (!doesSaleIdExists.length) {
    return { error: { code: 404, message: 'Sale not found' } };
  }

  await salesModel.deleteSale(saleId);

  return { code: 204 };
};

const updateSale = async (saleId, saleArr) => {
  const doesSaleIdExists = await salesModel.getById(saleId);

  if (!doesSaleIdExists.length) {
    return { error: { code: 404, message: 'Sale not found' } };
  }

  await salesModel.deleteSalesProducts(saleId);

  await Promise.all(saleArr.map(({ productId, quantity }) => (
    salesModel.createSaleProduct(saleId, productId, quantity)
  )));

  const response = {
    saleId,
    itemsUpdated: saleArr,
  };

  return { code: 200, data: response };
};

module.exports = {
  getAll,
  getById,
  createSale,
  deleteSale,
  updateSale,
};