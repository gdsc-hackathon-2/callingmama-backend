const PORT = 8080;
const axios = require('axios');

class Client {
    constructor(token, email, username, address, port) {
        this.token = token;
        this.email = email;
        this.username = username;
        this.address = address;
        this.port = port;
    }

    solve(content) {
        this.request({content: content});
    }

    request(params) {
        try {
            console.log(params)
            axios.post("http://localhost:" + this.port + "/notification", params).then(r => {
            });
        } catch (_) {
        }
    }
}

module.exports = Client;