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
    }
    getJSONData(){
        return {
            id: this.id,
            author: this.author,
            notifyTime: this.notifyTime,
            title: this.title,
            content: this.content,
            solved: this.solved
        };
    }
    getId(){
        return this.id;
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