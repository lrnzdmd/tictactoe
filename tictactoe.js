function Gameboard() {
    const board = new Array(3).fill(null).map(() => new Array(3).fill(" "));


    this.printBoard = () => console.log(board);

    this.addMark = function(mark, column, row) {
        board[column][row] = mark;
    } 
}

const board = new Gameboard();
board.addMark("X", 2,2)
board.printBoard();