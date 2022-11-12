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

    getBoards(){
        let ret = [];
        for(let boardId in this.boards){
            let board = this.boards[boardId];
            if(! board.isSolved())
                ret.push(board);
        }
        return ret;
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