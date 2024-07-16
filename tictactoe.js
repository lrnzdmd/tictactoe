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
    this.name = name;
    this.getMark = function () {
        if (playerNumber === 1) { 
            return "✖"; } 
            else { 
                return "〇"; }
    }
}

const board = new Gameboard();

board.printBoard();