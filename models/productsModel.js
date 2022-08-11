const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [response] = await connection.execute(query);
  return response;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[response]] = await connection.execute(query, [id]);
  return response;
};

module.exports = {
  getAll,
  getById,
};