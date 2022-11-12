const REGISTER_ERROR = 511;
const LOGIN_ERROR = 512;

class Router {
    constructor(app, clientHandler, database) {
        this.app = app;
        this.db = database;
        this.clientHandler = clientHandler;
    }
    init(){
        this.app.post('/register', (req, res) =>{
            let session = req.session;
            if(typeof session.username !== "undefined"){
                // 이미 로그인했을떄
                res.status(REGISTER_ERROR).json({result: "error"});
                return;
            }
            let body = req.body;
            let result = this.register(body);
            if(result !== true){
                res.status(REGISTER_ERROR).json({result: "error"});
            } else {
                res.status(200).json({result: "success"});
            }
        });
        this.app.post('/login', (req, res) => {
            let session = req.session;
            if(typeof session.username !== "undefined"){
                res.status(LOGIN_ERROR).json({result: "error"});
                return;
            }
            let body = req.body;
            let username = body.username;
            let password = body.password;
            if(! username || ! password){

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
        return true;
    }
}
module.exports = Router;