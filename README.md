<h1 align="left">Store Manager</h1>

###

<p align="left">This project aimed to develop a fully RESTful API using the MSC (model-service-controller) architecture.<br><br>The API built was a sales management system in dropshipping format in which it is possible to create, view, delete and update products and sales.<br><br>For the construction of the API, Node.js was used with Express and a MySQL database for data management. In the testing part, 100% code coverage was done using Mocha, Chai and Sinon.</p>

###

<h2 align="left">Technologies used</h2>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="50" width="62" alt="javascript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="50" width="62" alt="nodejs logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="50" width="62" alt="express logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="50" width="62" alt="mysql logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" height="50" width="62" alt="mocha logo"  />
</div>

###

<h2 align="left">How to use the application</h2>

###

Clone the application using the `git clone` command. After that, enter the project folder using the `cd store-manager` command and run the `npm install` command. After installation, use the `npm start` command and enter port `3000` in your browser.

###

<h2 align="left">About the database</h2>

###
- Create the databse

`npm run migration`

- Populate the database

`npm run seed`

###

<h2 align="left">Endpoints</h2>

###

<h2 align="left">Products</h2>

| Method | Functionality | URL |
|---|---|---|
| `GET` | List all products | http://localhost:3001/products |
| `GET` | List a product whose name includes the string | http://localhost:3001/products?q |
| `GET` | List a product based on its id | http://localhost:3001/products/:id |
| `POST` | Create a new product | http://localhost:3001/products |
| `DELETE` | Delete a product based on its id | http://localhost:3001/products/:id |
| `PUT` | Update a product based on its id | http://localhost:3001/products/:id |

###

<h2 align="left">Sales</h2>

| Method | Functionality | URL |
|---|---|---|
| `GET` | List all sales | http://localhost:3001/sales |
| `GET` | List a sale based on its id | http://localhost:3001/sales/:id |
| `POST` | Create a new sale | http://localhost:3001/sales |
| `DELETE` | Delete a sale based on its id | http://localhost:3001/sales/:id |
| `PUT` | Update a sale based on its id | http://localhost:3001/sales/:id |
