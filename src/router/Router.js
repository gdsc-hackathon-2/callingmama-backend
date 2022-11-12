const REGISTER_ERROR = 511;
const LOGIN_ERROR = 512;
const BOARD_ERROR = 513;

const crypto = require('crypto');
const Client = require('../client/Client.js');
const Board = require('../board/Board.js');

class Router {
    constructor(app, clientManager, database) {
        this.app = app;
        this.db = database;
        this.clientManager = clientManager;

        this.sessions = {};
    }

    init() {
        this.app.post('/solve', (req, res)=>{
            let body = req.body;
            let token = body.token;
            let boardId = body.boardId;
            let board = this.db.boards[boardId];

        });
        this.app.post('/boardlist', (req, res) =>{
            let body = req.body;
            let token = body.token;
            let page = body.page; //0부터 시작
            let range = [page*5, page*5+4];
            let boards = this.db.getBoards(range);

            res.json({"boards": boards});
        })
        this.app.post('/newboard', (req, res) => {
            let body = req.body;
            let token = body.token;
            if (!this.clientManager.isLoggedIn(token)) {
                // 로그인되어있지 않을 때
                res.status(BOARD_ERROR).json({result: "error"});
                return;
            }
            let title = body.title;
            let content = body.content;
            let notifyTime = body.notifyTime;
            if (!title || !content) {
                res.status(BOARD_ERROR).json({result: "error"});
                return;
            }
            let board = new Board(this.clientManager.clients[token].username, title, content, notifyTime, false);
            this.db.makeBoard(board);
        })

        this.app.post('/register', (req, res) => {
            let body = req.body;
            let result = this.register(body);
            if (result) { // 가입 성공
                let token = this.clientManager.login(body.email, req.socket.remoteAddress); //가입 성공시 로그인하도록.
                res.status(200).json({result: "success", token: token});
            } else {
                res.status(REGISTER_ERROR).json({result: "error"});
            }
        });

        this.app.post('/login', (req, res) => { //email, password로 로그인
            let body = req.body;
            let email = body.email
            let password = body.password;
            if (!email || !password) {
                res.status(LOGIN_ERROR).json({result: "error"});
                return;
            }
            if (this.db.matchUser(email, password)) {
                let token = this.clientManager.login(email, req.socket.remoteAddress);
                res.status(200).json({result: "success", token: token});
            } else {
                res.status(LOGIN_ERROR).json({result: "error"});
            }
        })
    }

    register(body) {
        let email = body.email;
        let password = body.password;
        let username = body.username;
        if (!email || !password || !username) {
            return false;
        }
        if (!this.db.isValidEmail(email) || !this.db.isValidUsername(username)) {
            return false;
        }
        this.db.register(email, username, password);
        return true;
    }
}

module.exports = Router;