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

  describe('Testa a criação de uma venda', () => {

    before(async () => {
      sinon.stub(salesModel, 'createSale').resolves({
        id: 3,
      });

      sinon.stub(Promise, 'all').resolves();
    });

    after(async () => {
      salesModel.createSale.restore();
      Promise.all.restore();
    });

    it('Verifica se retorna um objeto', async () => {
      const response = await salesService.createSale([{
        productId: 2,
        quantity: 7,
      }]);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'data');
    });

  });

  describe('Testa a exclusão de uma venda', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesModel, 'getById').resolves([{}]);

        sinon.stub(salesModel, 'deleteSale').resolves();
      });

      after(async () => {
        salesModel.getById.restore();
        salesModel.deleteSale.restore();
      });

      it('Verifica se retorna um objeto', async () => {
        const response = await salesService.deleteSale(3);

        expect(response).to.be.an('object');
        expect(response).to.have.keys('code');
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(salesModel, 'getById').resolves([]);
      });

      after(async () => {
        salesModel.getById.restore();
      });

      it('Verifica se retorna um objeto', async () => {
        const response = await salesService.deleteSale(99);

        expect(response).to.be.an('object');
        expect(response).to.have.key('error');
      });

    });
  });

  describe('Testa a atualização de uma venda', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesModel, 'getById').resolves([{}]);
        sinon.stub(salesModel, 'deleteSalesProducts').resolves();
        sinon.stub(Promise, 'all').resolves();
      });

      after(async () => {
        salesModel.getById.restore();
        salesModel.deleteSalesProducts.restore();
        Promise.all.restore();
      });

      it('Verifica se retorna um objeto', async () => {
        const response = await salesService.updateSale(2, [{
          productId: 4,
          quantity: 2
        }]);

        expect(response).to.be.an('object');
        expect(response).to.have.keys('code', 'data');
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(salesModel, 'getById').resolves([]);
      });

      after(async () => {
        salesModel.getById.restore();
      });

      it('Verifica se retorna um objeto de erro', async () => {
        const response = await salesService.updateSale(99);

        expect(response).to.be.an('object');
        expect(response).to.have.key('error');
      });

    });
  });
});