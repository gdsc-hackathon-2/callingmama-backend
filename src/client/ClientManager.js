const Database = require("../database/Database.js");
const crypto = require("crypto");
const Client = require("./Client");

class ClientManager {
    constructor(database) {
        this.clients = {}
        this.db = database;
    }

    login(email, address, port) {
        let token = crypto.randomBytes(32).toString('base64').slice(0, 32);
        let clientInfo = this.db.getClientInfo(email);

        this.clients[token] = new Client(token, clientInfo.email, clientInfo.username, address, port);
        return token;
    }
    getClientByUsername(username){
        for(let clientId in this.clients){
            let client = this.clients[clientId];
            if(client.username === username){
                return client;
            }
        }
        return null;
    }

    isLoggedIn(token) {
        return !token || typeof this.clients[token] !== "undefined";
    }
}
module.exports = ClientManager;