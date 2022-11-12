const crypto = require('crypto');
const mysql = require('sync-mysql');

class Database {
    constructor() {
        this.boards = {}
        this.connection = new mysql({
            host: 'server.cla6sha.de',
            user: 'mmsg',
            password: 'msg123!@#',
            database: 'mmsgdb'
        });
    }

    makeBoard(board) {
        this.boards[board.id] = board;
    }

    getBoard(id) {
        return this.boards[id];
    }

    getBoards() {
        let ret = [];
        for (let boardId in this.boards) {
            let board = this.boards[boardId];
            if (!board.isSolved())
                ret.push(board);
        }
        return ret;
    }

    matchUser(email, password) {
        let res = this.connection.query("select password from users where email='" + email + "'");
        return res[0].password === password;
    }

    register(email, username, password) {
        let id = crypto.randomBytes(32).toString('base64').slice(0, 32);
        let sql = "insert into users values('" +
            id + "', '" +
            username + "', '" +
            password + "', '" +
            email +"'" +
            ")";
        this.connection.query(sql);
    }

    getClientInfo(email) {
        let res = this.connection.query("select * from users where email='" + email + "'");
        if (res.length > 0)
            return res[0];
        return null;
    }

    isValidUsername(username) {
        let res = this.connection.query("select * from users where username='" + username + "'");
        return res.length === 0;
    }

    isValidEmail(email) {
        let res = this.connection.query("select * from users where email='" + email + "'");
        return res.length === 0;
    }
}

module.exports = Database;