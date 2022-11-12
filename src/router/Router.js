class Router {
    constructor(app, clientHandler, database) {
        this.app = app;
        this.db = database;
        this.clientHandler = clientHandler;
    }
    init(){
        this.app.post('/register', (req, res) =>{
            let session = req.session;
            if(typeof session.id !== "undefined"){
                // 이미 가입했을떄
                return;
            }
            let body = req.body;
        });
    }
    register(){
        let email = body.email;
        let password = body.password;
        let username = body.username;
        if(! email || ! password || !username){
            //가입 실패
            return;
        }
        let result = this.db.register(email, username, password);
    }
}
module.exports = Router;