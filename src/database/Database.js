const crypto = require('crypto');
class Database {
    constructor() {
        this.users = {}
        this.poasts = {}
    }
    matchUser(email, password){
        for(let userId in this.users){
            let user = this.users[userId];
            if(user.email === email){
                if(user.password === password){
                    return true;
                }
            }
        }
        return false;
    }
    register(email, username, password){
        let id = crypto.randomBytes(32).toString('base64').slice(0,32);
        this.users[id] = {id: id, email: email, username: username, password: password};
    }
    isValidUsername(username){
        for(let userId in this.users) {
            if(this.users[userId].username === username){
                return false;
            }
        }
        return true;
    }
    isValidEmail(email){
        for(let userId in this.users) {
            if(this.users[userId].email === email){
                return false;
            }
        }
        return true;
    }
}
module.exports = Database;