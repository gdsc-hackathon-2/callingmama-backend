let express = require('express');
let app = express();
const bodyParser = require("body-parser");

const ClientManager = require('./client/ClientManager.js');
const Router = require('./router/Router.js');
const Database = require('./database/Database');

app.use(bodyParser.json());

let database = new Database();
let clientManager = new ClientManager(database);
let router = new Router(app, clientManager, database);
router.init();

app.listen(8080);