const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

const req = {};
const res = {};
let next = new Function;

const serverErrorTest = (method) => {
  const serverErrorMessage = { code: 500, message: 'Server error.' };

  it('Verifica se chama o next com erro', async () => {
    await productsController[method](req, res, next);
    expect(next.calledWith(serverErrorMessage)).to.be.true;
  });
}

describe('Testa a camada controller de products', () => {
	describe('Testa a busca por todos os produtos', () => {
		describe('Testa em caso de sucesso', () => {

			before(async () => {
				sinon.stub(productsService, 'getAll').resolves({
					code: 200,
					data: {},
				});

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
			});

			after(async () => productsService.getAll.restore());

			it('Verifica se retorna o status 200', async () => {
				await productsController.getAll(req, res, next);
				expect(res.status.calledWith(200)).to.be.true;
			});
		});

		describe('Testa em caso de erro no servidor', () => {

			before(async () => {
				sinon.stub(productsService, 'getAll').rejects();

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
				next = sinon.stub().returns();
			});

			after(async () => productsService.getAll.restore());

      serverErrorTest('getAll');
		});
	});

	describe('Testa a busca de produto por id', () => {
		describe('Testa em caso de sucesso', () => {

			req.params = { id: 1 }

			before(async () => {
				sinon.stub(productsService, 'getById').resolves({
					code: 200,
					data: {},
				});

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
			});

			after(async () => productsService.getById.restore());

			it('Verifica se retorna status 200', async () => {
				await productsController.getById(req, res, next)
				expect(res.status.calledWith(200)).to.be.true;
			});

		});

		describe('Testa em caso de falha', () => {

			req.params = { id: 999 }

			before(async () => {
				sinon.stub(productsService, 'getById').resolves({
					error: {
						code: 404,
						message: 'Product not found',
					}
				});

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
			});

			after(async () => productsService.getById.restore());

			it('Verifica se retorna status 200', async () => {
				await productsController.getById(req, res, next)
				expect(res.status.calledWith(404)).to.be.true;
			});

		});

		describe('Testa em caso de falha no servidor', () => {

			before(async () => {
				sinon.stub(productsService, 'getById').rejects();
				req.params = { id: 999 };
				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
				next = sinon.stub().returns();
			});

			after(async () => productsService.getById.restore());

      serverErrorTest('getById');
		});
  });
  
  describe('Testa a criação de um produto', () => {
    
    describe('Testa caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'create').resolves({
          code: 201,
          id: 1,
          name: 'Produto #01',
        });

        req.body = { name: 'Produto #01' };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => productsService.create.restore());

      it('Verifica se chama com status 201', async () => {
        await productsController.create(req, res, next);
        expect(res.status.calledWith(201)).to.be.true;
      });
    });

    describe('Testa em caso de falha no servidor', () => {

      before(async () => {
        sinon.stub(productsService, 'create').rejects();
        req.body = { name: 'Produto #01' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => productsService.create.restore());

      serverErrorTest('create');
    });
  });

  describe('Testa a atualização de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'update').resolves({
          code: 200,
          data: {},
        });

        req.params = { id: 1 };
        req.body = { name: 'Produto #01' };
        req.status = sinon.stub().returns(res);
        req.status = sinon.stub().returns();
      });

      after(async () => productsService.update.restore());

      it('Verifica se o res.status é chamado com 200', async () => {
        await productsController.update(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(productsService, 'update').resolves({
          error: {
            code: 404,
            message: '../',
          }
        });

        req.params = { id: 999 };
        req.body = { name: 'Produto #00x' };
        req.status = sinon.stub().returns(res);
        req.status = sinon.stub().returns();
      });

      after(async () => productsService.update.restore());

      it('Verifica se o res.status é chamado com 200', async () => {
        await productsController.update(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });
    });

    describe('Testa em caso de falha so servidor', () => {

      before(async () => {
        sinon.stub(productsService, 'update').rejects();
        next = sinon.stub().returns();
      });

      after(async () => productsService.update.restore());

      serverErrorTest('update');
    });
  });

  describe('Testa a exclusão de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'exclude').resolves({
          code: 204,
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();
      });

      after(async () => productsService.exclude.restore());

      it('Verifica se o res.status é chamado com 204', async () => {
        await productsController.exclude(req, res, next);
        expect(res.status.calledWith(204)).to.be.true;
      });
    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(productsService, 'exclude').resolves({
          error: {
            code: 404,
            message: '../',
          },
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => productsService.exclude.restore());

      it('Verifica se o res.status é chamado com 204', async () => {
        await productsController.exclude(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });
    });

    describe('Testa em caso de falha so servidor', () => {

      before(async () => {
        sinon.stub(productsService, 'exclude').rejects();
        next = sinon.stub().returns();
      });

      after(async () => productsService.exclude.restore());

      serverErrorTest('exclude');
    });
  });

  describe('Testa a busca de produto por nome', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'getByName').resolves({
          code: 200,
          data: [{}],
        });

        req.query = { q: 'Produto #01' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });

      after(async () => productsService.getByName.restore());

      it('Verifica se chama o res.status com 200', async () => {
        await productsController.getByName(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });

    describe('Testa em caso de falha no servidor', () => {

      before(async () => {
        sinon.stub(productsService, 'getByName').rejects();
        next = sinon.stub().returns();
      });

      after(async () => productsService.getByName.restore());

      serverErrorTest('getByName');
    });
  });
});