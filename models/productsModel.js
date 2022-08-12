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

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return { id: insertId, name };
};

const update = async (id, name) => {
  const query = `UPDATE StoreManager.products 
  SET name = ?
  WHERE id = ?`;

  await connection.execute(query, [name, id]);
  return { id, name };
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
  return { id };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};