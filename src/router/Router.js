const REGISTER_ERROR = 511;
const LOGIN_ERROR = 512;
const POST_ERROR = 513;

const crypto = require('crypto');

class Router {
    constructor(app, clientHandler, database) {
        this.app = app;
        this.db = database;
        this.clientHandler = clientHandler;

        this.sessions = {};
    }
    init(){
        this.app.post('/addpost', (req, res) => {
            let body = req.body;
            let token = body.token;
            if(! this.isLoggedIn(token)){
                // 이미 로그인했을떄
                res.status(POST_ERROR).json({result: "error"});
                return;
            }
            if(! this.isLoggedIn()){

            }
        })

        this.app.post('/register', (req, res) =>{
            let body = req.body;
            let result = this.register(body);
            if(result){ // 가입 성공
                let token = this.login(body.username); //가입 성공시 로그인하도록.
                res.status(200).json({result: "success", token: token});
            } else {
                res.status(REGISTER_ERROR).json({result: "error"});
            }
        });

        this.app.post('/login', (req, res) => {
            let body = req.body;
            let username = body.username;
            let password = body.password;
            if(! username || ! password){
                res.status(LOGIN_ERROR).json({result: "error"});
                return;
            }
            if(this.db.matchUser(username, password)){
                let token = this.login(username);
                res.status(200).json({result:"success", token: token});
            } else {
                res.status(LOGIN_ERROR).json({result: "error"});
            }
        })
    }
    // 성공했을경우
    register(body){
        let email = body.email;
        let password = body.password;
        let username = body.username;
        if(! email || ! password || !username){
            return false;
        }
        if(! this.db.isValidEmail(email) || !this.db.isValidUsername(username)){
            return false;
        }
        this.db.register(email, username, password);
        return true;
    }

    login(username){
        let token = crypto.randomBytes(32).toString('base64').slice(0,32);
        this.sessions[token] = username;
        return token;
    }

    isLoggedIn(token){
        return typeof this.sessions[token] !== "undefined";
    }
}
module.exports = Router;