require('date-utils');
class SolveQueueHandler{
    constructor(clientManager) {
        this.solvequeue = {};
        this.clientManager = clientManager;
        setInterval(this.check.bind(this), 1000);
    }
    add(board){
        this.solvequeue[board.notifyTime] = board;
    }
    check(){
        for(let timestamp in this.solvequeue){
            let board = this.solvequeue[timestamp]
            let time = new Date();
            let format = time.toFormat("YYYY-MM-DD-HH24-MI");
            if(format === board.notifyTime){
                let author = board.author;
                let client = this.clientManager.getClientByUsername(author);
                board.solved = true;
                delete this.solvequeue[board.notifyTime];
            }
        }
    }

}
module.exports = SolveQueueHandler;