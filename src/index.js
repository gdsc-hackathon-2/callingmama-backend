let express = require('express');
let app = express();
const bodyParser = require("body-parser");

const ClientHandler = require('./client/ClientHandler.js');
const Router = require('./router/Router.js');
const Database = require('./database/Database');

app.use(bodyParser.json());

let clientHandler = new ClientHandler();
let database = new Database();
let router = new Router(app, clientHandler, database);
