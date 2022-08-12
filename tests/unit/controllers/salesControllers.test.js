const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

const req = {};
const res = {};
let next = new Function;

const serverErrorTest = (method) => {
  const serverErrorMessage = { code: 500, message: 'Server error.' };

  it('Verifica se chama o next com erro', async () => {
    await salesController[method](req, res, next);
    expect(next.calledWith(serverErrorMessage)).to.be.true;
  });
}

describe('Testa a camada controller de sales', () => {
  describe('Testa a busca por todas as vendas', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesService, 'getAll').resolves({
          code: 200,
          data: [{}],
        });

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => salesService.getAll.restore());

      it('Verifica se retorna com status 200', async () => {
        await salesController.getAll(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });

    describe('Testa em caso de falha no servidor', () => {

      before(async () => {
        sinon.stub(salesService, 'getAll').rejects();
        next = sinon.stub().returns();
      });

      after(async () => salesService.getAll.restore());

      serverErrorTest('getAll');
    });
  });

  describe('Testa a busca de vendas por id', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesService, 'getById').resolves({
          code: 200,
          data: [{}],
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(); 
      });

      after(async () => salesService.getById.restore());

      it('Verifica se retona com status 200', async () => {
        await salesController.getById(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(salesService, 'getById').resolves({
          error: {
            code: 404,
            message: '..',
          }
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => salesService.getById.restore());

      it('Verifica se retona com status 404', async () => {
        await salesController.getById(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });

    });

    describe('Testa em caso de no servidor', () => {

      before(async () => {
        sinon.stub(salesService, 'getById').rejects();
      });

      after(async () => salesService.getById.restore());

      serverErrorTest('getById');

    });
  });
});