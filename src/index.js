let express = require('express');
let app = express();
let session = require('express-session');
const bodyParser = require("body-parser");

const ClientHandler = require('./client/ClientHandler.js');
const Router = require('./router/Router.js');
const Database = require('./database/Database');

app.use(bodyParser.json());

let s = session({
    secret: "session3$SAFD",
    resave: false,
    saveUninitialized: true
})
app.use(s);

let clientHandler = new ClientHandler();
let database = new Database();
let router = new Router(app, clientHandler, database);
