require('date-utils');
const crypto = require("crypto");
class Board{
    constructor(author, title, content, notifyTime, solved){
        this.author = author;
        this.title = title;
        this.content = content;
        this.notifyTime = notifyTime;
        this.solved = solved;
        this.id = crypto.randomBytes(32).toString('base64').slice(0, 32);
        this.timestamp = Date.now();
    }
    getJSONData(){
        return {
            author: this.author,
            title: this.title,
            content: this.content,
            timestamp: this.timestamp,
            notifyTime: this.notifyTime
        };
    }
    getTimeStamp(){
        return this.timestamp;
    }
    solve(){
        this.solved = true;
    }
    isSolved(){
        return this.solved;
    }
    getAuthor(){
        return this.author;
    }
    getTitle(){
        return this.title;
    }
    getContent(){
        return this.content;
    }
}
module.exports = Board;