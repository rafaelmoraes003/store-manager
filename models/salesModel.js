const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id AS saleId, s.date, 
  sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id, sp.product_id`;
  
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (saleId) => {
  const query = `SELECT s.date, sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  AND s.id = ?
  ORDER BY sp.sale_id, sp.product_id`;

  const [result] = await connection.execute(query, [saleId]);
  return result;
};

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (DEFAULT)';
  const [{ insertId }] = await connection.execute(query);
  return { id: insertId };
};

const createSaleProduct = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  await connection.execute(query, [saleId, productId, quantity]);
};

const deleteSale = async (saleId) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [saleId]);
};

module.exports = {
  getAll,
  getById,
  createSale,
  createSaleProduct,
  deleteSale,
};