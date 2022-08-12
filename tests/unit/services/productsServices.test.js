const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Testa a camada service de products', () => {
  describe('Testa a busca de todos os produtos', () => {

    before(async () => {
      sinon.stub(productsModel, 'getAll').resolves([{
        id: 0,
        name: 'Produto #0x',
      }]);
    });

    after(async () => productsModel.getAll.restore());

    it('Verifica se rotorna um objeto', async () => {
      const response = await productsService.getAll();
      expect(response).to.be.an('object');
    });

    it('Verifica se o objeto tem as chaves code e data', async () => {
      const response = await productsService.getAll();
      expect(response).to.have.keys('code', 'data');
    });
  });

  describe('Testa a busca de produtos por id', () => {
    
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves({
          id: 1,
          name: 'Produto #01'
        });
      });

      after(async () => sinon.stub(productsModel.getById.restore()));

      it('Verifica se retorna um objeto', async () => {
        const response = await productsService.getById(1);
        expect(response).to.be.an('object');
      });

      it('Verifica se retorna um objeto com as chaves code e data', async () => {
        const response = await productsService.getById(1);
        expect(response).to.have.keys('code', 'data');
      });

      it('Verifica se a chave data retorna um objeto', async () => {
        const response = await productsService.getById(1);
        expect(response.data).to.be.an('object');
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(undefined);
      });

      after(async () => productsModel.getById.restore());

      it('Verifica se retorna um objeto de erro', async () => {
        const response = await productsService.getById(999);
        expect(response).to.have.key('error');
      });

    });

  });

  describe('Testa a inserção de um produto', () => {

    before(async () => {
      sinon.stub(productsModel, 'create').returns({
        id: 1,
        name: 'Nome #01',
      });
    });

    after(async () => productsModel.create.restore());

    it('Verifica se retorna um objeto', async () => {
      const response = await productsService.create('Nome #01');
      expect(response).to.be.an('object');
    });

    it('Verifica se o objeto tem as chaves code, id e name', async () => {
      const response = await productsService.create('Nome #01');
      expect(response).to.have.keys('code', 'id', 'name');
    });

  });

  describe('Testa a atualização de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves({
          true: true,
        });

        sinon.stub(productsModel, 'update').resolves({
          id: 1,
          name: 'Produto #01',
        });
      });

      after(async () => {
        productsModel.getById.restore();
        productsModel.update.restore();
      });

      it('Verifica se retona um objeto com duas chaves', async () => {
        const response = await productsService.update(1, 'Produto #01');
        expect(response).to.be.an('object');
        expect(response).to.have.keys('code', 'data');
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(undefined);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Verifica se retona um objeto de erro', async () => {
        const response = await productsService.update(1, 'Produto #01');
        expect(response).to.be.an('object');
        expect(response).to.have.key('error');
      });

    });
  });

  describe('Testa a exclusão de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves({
          true: true,
        });

        sinon.stub(productsModel, 'exclude').resolves();
      });

      after(async () => {
        productsModel.getById.restore();
        productsModel.exclude.restore();
      });

      it('Verifica se retona um obejto com code 204', async () => {
        const response = await productsService.exclude(1);
        expect(response).to.be.an('object');
        expect(response).to.have.key('code');
      });
    });

    describe('Testa em caso de erro', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(undefined);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Verifica se retona um obejto de erro', async () => {
        const response = await productsService.exclude(1);
        expect(response).to.be.an('object');
        expect(response).to.have.key('error');
      });

    });
  });
});