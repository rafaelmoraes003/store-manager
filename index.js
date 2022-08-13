const app = require('./app');
require('dotenv').config();
const productsRoute = require('./routes/products');
const salesRoute = require('./routes/sales');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.use((err, _req, res, _next) => {
  const { code, message } = err;
  return res.status(code).json({ message });
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
