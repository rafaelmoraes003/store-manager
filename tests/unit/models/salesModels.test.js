const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

const fakeSales = {
  saleId: 1,
  date: new Date(),
  productId: 1,
  quantity: 5
}

const fakeSalesId = {
  date: new Date(),
  productId: 1,
  quantity: 5
}

describe('Testa a camada model de sales', () => {
  describe('Testa listar todas as vendas', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[fakeSales]]);
    });

    after(async () => connection.execute.restore());

    it('Verifica se retorna um array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });

    it('Verifica se retorna um array de objetos', async () => {
      const response = await salesModel.getAll();
      expect(response[0]).to.be.an('object');
    });
  });

  describe('Testa listar todas as vendas por id', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[fakeSalesId]]);
    });

    after(async () => connection.execute.restore());

    it('Verifica se retorna um array', async () => {
      const response = await salesModel.getById(1);
      expect(response).to.be.an('array');
    });

    it('Verifica se retorna um array de objetos', async () => {
      const response = await salesModel.getById(1);
      expect(response[0]).to.be.an('object');
    });
  });
});