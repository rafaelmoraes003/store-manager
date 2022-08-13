const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Testa a camada model de products', () => {

  describe('Testa a busca de todos os produtos', () => {

    const allProducts = [
      {
        id: 1,
        name: "Martelo de Thor"
      },
      {
        id: 2,
        name: "Traje de encolhimento"
      },
      {
        id: 3,
        name: "Escudo do Capitão América"
      }
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves([allProducts])
    });

    after(async () => connection.execute.restore());

    it('Verifica se o retorno é um array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('Verifica se o array tem 3 elementos', async () => {
      const response = await productsModel.getAll();
      expect(response).to.have.lengthOf(3);
    });

  });

  describe('Testa a busca de produto por Id', () => {
    describe('Verifica o retorno em caso de sucesso', () => {

      const product = {
        id: 1,
        name: "Celular",
      };

      before(async () => {
        sinon.stub(connection, 'execute').resolves([[product]]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Verifica se retorna um objeto', async () => {
        const response = await productsModel.getById(1);
        expect(response).to.be.an('object');
      });

      it('Verifica se o objeto tem as chaves "id" e "name"', async () => {
        const response = await productsModel.getById(1);
        expect(response).to.have.keys('id', 'name');
      });

    });

    describe('Verifica o retorno em caso de falha', () => {

      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(async () => connection.execute.restore());

      it('Verifica se retorna undefined', async () => {
        const response = await productsModel.getById(999);
        expect(response).to.be.undefined;
      });

    });

  });

  describe('Testa a criação de um produto', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(async () => connection.execute.restore());

    it('Verifica se retornaum objeto', async () => {
      const response = await productsModel.create('celular');
      expect(response).to.be.an('object');
    });

    it('Verifica se retorna um objeto com chaves id e name', async () => {
      const response = await productsModel.create('celular');
      expect(response).to.have.keys('id', 'name');
    });

  });

  describe('Testa a atualização de um produto', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => connection.execute.restore());

    it('Verifica se retona um objeto', async () => {
      const response = await productsModel.update(1, 'celular');
      expect(response).to.be.an('object');
    });
  });

  describe('Testa a exclusão de um produto', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(async () => connection.execute.restore());

    it('Verifica se a query é executada', async () => {
      const response = await productsModel.exclude(1);
      expect(response).to.be.an('object');
    });

  });

  describe('Testa a busca de produto por nome', () => {

    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{
        id: 1,
        name: 'Produto #01',
      }]]);
    });

    after(async () => connection.execute.restore());

    it('Verifica se retorna um array de objetos', async () => {
      const response = await productsModel.getByName('Produto');
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
      expect(response[0]).to.have.keys('id', 'name');
    });
  });
});