require('date-utils');

class SolveQueueHandler {
    constructor(clientManager) {
        this.solvequeue = {};
        this.clientManager = clientManager;
        setInterval(this.check.bind(this), 1000);
    }

    add(board, content) {
        board.toSend = content;
        this.solvequeue[board.getId()] = board;
    }

    check() {
        for (let boardId in this.solvequeue) {
            let board = this.solvequeue[boardId]
            let date = new Date();
            let time = date.getTime();
            let format = date.toFormat("YYYY-MM-DD-HH24-MI");
            let targetTime = this.formatToTimestamp(board.notifyTime);

            if(time > targetTime){
                board.solved = true;
                delete this.solvequeue[board.id];
                continue;
            }
            if (format === board.notifyTime) {
                let author = board.author;
                let client = this.clientManager.getClientByUsername(author);
                client.solve(board.toSend);
                board.solved = true;
                delete this.solvequeue[board.id];
            }
        }
    }
    formatToTimestamp(string){
        let times = string.split("-");
        for(let i=0;i<5;i++){
            times[i] = parseInt(times[i]);
        }
        let year = times[0];
        let month = times[1];
        let day = times[2];
        let hour = times[3];
        let minute = times[4];

        let date = new Date();
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(minute);
        return date.getTime();
    }
}

module.exports = SolveQueueHandler;