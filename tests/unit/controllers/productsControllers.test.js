const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

const serverErrorMessage = { code: 500, message: 'Server error.' };

describe('Testa a camada controller de products', () => {
	describe('Testa a busca por todos os produtos', () => {
		describe('Testa em caso de sucesso', () => {
			const req = {};
			const res = {};
			const next = () => {};

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
			const req = {};
			const res = {};
			let next = new Function;

			before(async () => {
				sinon.stub(productsService, 'getAll').rejects();

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
				next = sinon.stub().returns();
			});

			after(async () => productsService.getAll.restore());

			it('Verifica se retorna o status 500', async () => {
				await productsController.getAll(req, res, next);
				expect(next.calledWith(serverErrorMessage)).to.be.true;
			});
		});
	});

	describe('Testa a busca de produto por id', () => {
		describe('Testa em caso de sucesso', () => {

			const req = {};
			req.params = { id: 1 }
			const res = {};
			const next = new Function;

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

			const req = {};
			req.params = { id: 999 }
			const res = {};
			const next = new Function;

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

			const req = {};
			const res = {};
			let next = new Function;

			before(async () => {
				sinon.stub(productsService, 'getById').rejects();
				req.params = { id: 999 };
				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
				next = sinon.stub().returns();
			});

			after(async () => productsService.getById.restore());

			it('Verifica se chama o next com erro', async () => {
				await productsController.getById(req, res, next);
				expect(next.calledWith(serverErrorMessage)).to.be.true;
			});
		});
	});
});