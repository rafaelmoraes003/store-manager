const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Testa a camada service de sales', () => {
  describe('Testa a listagem de todas as vendas', () => {

    before(async () => {
      sinon.stub(salesModel, 'getAll').returns([{}]);
    });

    after(async () => salesModel.getAll.restore());

    it('Verifica se retorna um objeto', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'data');
    });
  });

  describe('Testa a listagem de vendas por id', () => {

    describe('Testa caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesModel, 'getById').returns([{}]);
      });

      after(async () => salesModel.getById.restore());

      it('Verifica se retorna um objeto', async () => {
        const response = await salesService.getById();
        expect(response).to.be.an('object');
        expect(response).to.have.keys('code', 'data');
      });

    });

    describe('Testa caso de falha', () => {

      before(async () => {
        sinon.stub(salesModel, 'getById').returns([]);
      });

      after(async () => salesModel.getById.restore());

      it('Verifica se retorna um objeto de erro', async () => {
        const response = await salesService.getById();
        expect(response).to.be.an('object');
        expect(response).to.have.key('error');
      });

    });
  });
});