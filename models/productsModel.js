const connection = require('./connection');

const getAll = async () => {
  try {
    const query = 'SELECT * FROM StoreManager.products;';
    const [response] = await connection.execute(query);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id) => {
  try {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[response]] = await connection.execute(query, [id]);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
};