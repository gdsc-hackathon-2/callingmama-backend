const crypto = require('crypto');

class Database {
    constructor() {
        this.users = {}
        this.boards = {}
    }

    makeBoard(board){
        this.boards[board.id] = board;
    }

    getBoard(id){
        return this.boards[id];
    }

    getBoards(range){
        let start = range[0];
        let end = range[1];
        let res = [];
        for(let i=start;i<=end;i++){
            res.push(Object.values(this.boards)[i].getJSONData());
        }
        return res;
    }

    matchUser(email, password) {
        for (let userId in this.users) {
            let user = this.users[userId];
            if (user.email === email) {
                if (user.password === password) {
                    return true;
                }
            }
        }
        return false;
    }

    register(email, username, password) {
        let id = crypto.randomBytes(32).toString('base64').slice(0, 32);
        this.users[id] = {id: id, email: email, username: username, password: password};
    }

    getClientInfo(email) {
        for (let userId in this.users) {
            if (this.users[userId].email === email) {
                return this.users[userId];
            }
        }
        return null;
    }

    isValidUsername(username) {
        for (let userId in this.users) {
            if (this.users[userId].username === username) {
                return false;
            }
        }
        return true;
    }

    isValidEmail(email) {
        for (let userId in this.users) {
            if (this.users[userId].email === email) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Database;