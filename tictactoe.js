// Game board object constructor

function Gameboard() {
    const board = new Array(3).fill(null).map(() => new Array(3).fill(" "));
    this.printBoard = () => console.log(board);
    this.addMark = function(mark, row, column) {
        if (board[row][column] === " ") {
        board[row][column] = mark;
        return true;
        } 
        else { 
            alert("Can't place mark there"); 
            return false;
        }
    }
    this.resetBoard = function() {
        board.forEach(row => row.fill(" "));
    }
    this.getBoard = function () {
        return board;
    }
}

// Player object constructor

function Player(name, playerNumber) {
    this.score = 0;
    this.name = name;
    this.getMark = function () {
        if (playerNumber === 1) { 
            return "✖"; } 
            else { 
                return "〇"; }
    }
    this.getName = () => {return this.name;}
    this.getScore = () => {return this.score;}
    this.addScore = () => {this.score++;}
    this.resetScore = () => {this.score = 0;}
}

// Game manager object constructor
function GameManager(player1, player2, board) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = board;
    this.whoseTurn = this.player1;
    this.changeTurn = function () {
        this.whoseTurn = this.whoseTurn === player1 ? player2 : player1;
    }
    this.newGame = function () {
        this.whoseTurn = this.player1;
        this.board.resetBoard();
        this.player1.resetScore();
        this.player2.resetScore();
        this.playTurn();
    }
    this.checkWinCondition = function () {
        const bsize = this.board.getBoard().length
        console.log(bsize);
        function checkEquals(linetocheck) {
            return linetocheck.every(cell => cell !== " " && cell === linetocheck[0])
        }

        // Row check
        for (let row = 0; row < bsize; row++) {
            if (checkEquals(this.board.getBoard()[row])) {
                return this.board.getBoard()[row][0];           // Returns 〇 or ✖ if winning row is detected
            }
        }

        // Column check
        for (let col = 0; col < bsize; col++) {
            let columncheck = [];
 
            for (let row = 0; row < bsize; row++) {
                columncheck.push(this.board.getBoard()[row][col]);
            }
            if (checkEquals(columncheck)) {
                return columncheck[0];               
            }
        }
        // First diagonal check
        let firstdiagcheck = [];
        for (let i = 0; i < bsize; i++) {
            firstdiagcheck.push(this.board.getBoard()[i][i]);
        }
        if (checkEquals(firstdiagcheck)) {
            return firstdiagcheck[0];
        }
        // Second diagonal check
        let secondiagcheck = [];
        for (let i = 0; i < bsize; i++) {
            
            secondiagcheck.push(this.board.getBoard()[i][bsize - i - 1]);
        }
        if (checkEquals(secondiagcheck)) {
            return secondiagcheck[0];
        }

        return null;
    }

    this.playTurn = function () {
        const x = prompt(this.whoseTurn.getName() + " select row to place your mark");
        const y = prompt(this.whoseTurn.getName() + " select column to place your mark");
        if (!this.board.addMark(this.whoseTurn.getMark(), x, y)) {
            this.playTurn();
        } else {
            if (this.checkWinCondition()) {
                this.board.printBoard();
                this.endGame();
            } else {
                this.changeTurn();
                this.board.printBoard();
                this.playTurn();
            }
            
        }
    }

    this.endGame = function () {
        if (this.checkWinCondition() === "✖") {
            console.log(this.player1.getName() + " wins");
            this.player1.addScore();
        }
        else {
            console.log(this.player2.getName() + " wins");
            this.player2.addScore();
        }
        
    }
}
const board = new Gameboard();
const player1 = new Player("p1",1);
const player2 = new Player("p2", 2);
const GM = new GameManager(player1,player2,board);

GM.newGame();


board.printBoard();