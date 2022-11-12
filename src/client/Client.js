class Client {
    constructor(clientHandler, username, email) {
        this.clientHandler = clientHandler;
        this.username = username;
        this.email = email;
    }

    getEmail() {
        return this.email;
    }
    getUsername(){
        return this.username;
    }
}

module.exports = Client;