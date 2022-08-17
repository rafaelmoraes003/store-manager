<h1 align="left">Projeto Store Manager</h1>

###

<p align="left">Projeto Store Manager, que tinha como objetivo desenvolver uma API totalmente RESTful utilizando a arquitetura MSC (model-service-controller).<br><br>A API construída foi um sistema de gerenciamento de vendas no formato dropshipping em que é possível criar, visualizar, deletar e atualizar produtos e vendas.<br><br>Para a contrução da API, foi utilizado Node.js com Express e um banco de dados MySQL para a gestão de dados. Na parte de testes, a cobertura de 100% do código foi feita usando Mocha, Chai e Sinon.</p>

###

<h2 align="left">Tecnologias utilizadas</h2>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" width="52" alt="javascript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" width="52" alt="nodejs logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" width="52" alt="express logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="40" width="52" alt="mysql logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" height="40" width="52" alt="mocha logo"  />
</div>

###

<h2 align="left">Como utilizar a aplicação</h2>

###

Faça o clone da aplicação usando o comando `git clone`. Após isso, entre na pasta do projeto utilizando o comando `cd store-manager` e rode o comando `npm install`. Após a instalação, utilize o comando `npm start` e entre na porta `3000` de seu navegador.

###

<h2 align="left">Sobre o banco de dados</h2>

###
<p align="left">- Criar o banco de dados</p>

`npm run migration`

<p align="left">- Limpar e popular o banco de dados</p>

`npm run seed`
