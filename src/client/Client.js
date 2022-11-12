const PORT = 8080;
const axios = require('axios');

class Client {
    constructor(token, email, username, address) {
        this.token = token;
        this.email = email;
        this.username = username;
        this.address = address;
    }
    solve(content){
        this.request({content: content});
    }
    request(params){
        axios.post(this.address, params).then(r => {
        });
    }
}
module.exports = Client;