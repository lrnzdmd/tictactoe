// Game board object constructor

function Gameboard() {
    const board = new Array(3).fill(null).map(() => new Array(3).fill(" "));
    this.printBoard = () => console.log(board);
    this.addMark = function(mark, row, column) {
        board[row][column] = mark;
    }
    this.resetBoard = function() {
        board.forEach(row => row.fill(" "));
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

const board = new Gameboard();


board.printBoard();