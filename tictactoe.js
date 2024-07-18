// Game board object constructor

function Gameboard() {
  const board = new Array(3).fill(null).map(() => new Array(3).fill(" "));
  this.addMark = function (mark, row, column) {
    if (board[row][column] === " ") {
      board[row][column] = mark;
      return true;
    } else {
      alert("Can't place mark there");
      return false;
    }
  };
  this.resetBoard = function () {
    board.forEach((row) => row.fill(" "));
  };
  this.getBoard = function () {
    return board;
  };
}

// Player object constructor

function Player(name, playerNumber) {
  this.playerNumber = playerNumber;
  this.score = 0;
  this.name = name;
  this.getMark = function () {
    if (this.playerNumber === 1) {
      return "✕";
    } else {
      return "◯";
    }
  };
  this.getName = () => {
    return this.name;
  };
  this.getScore = () => {
    return this.score;
  };
  this.addScore = () => {
    this.score++;
  };
  this.resetScore = () => {
    this.score = 0;
  };
}

// Display manager object

function DisplayManager() {
  this.p1scoretext = document.getElementById("p1score");
  this.p1nametext = document.getElementById("p1name");
  this.p2scoretext = document.getElementById("p2score");
  this.p2nametext = document.getElementById("p2name");
  this.wintext = document.getElementById("wintext");
  this.gridcells = document.querySelectorAll(".grid");
  this.startbutton = document.getElementById("startgamebtn");
  this.restartbutton = document.getElementById("restartgamebtn");
}

// Game manager object constructor
function GameManager(player1, player2, board, displayman) {
  this.player1 = player1;
  this.player2 = player2;
  this.board = board;
  this.displayManager = displayman;
  this.gameOver;
  this.whoseTurn = this.player1;
  this.lastWinner;
  this.newGame = function () {
    this.grfStart();
    this.initListeners();
    this.grfUpdate();
    this.gameOver = false;
  };
  // Initializes the graphics for the game
  this.grfStart = function () {
    this.displayManager.startbutton.style.display = "none";
    this.displayManager.p1nametext.textContent = this.player1.getName();
    this.displayManager.p2nametext.textContent = this.player2.getName();
    this.displayManager.p1scoretext.textContent = this.player1.getScore();
    this.displayManager.p2scoretext.textContent = this.player2.getScore();
    this.displayManager.wintext.style.display = "block";
  };

  this.grfUpdate = function () {
    const boardState = this.board.getBoard();
    let wintxt = this.displayManager.wintext;

    this.displayManager.gridcells.forEach((cell, index) => {
      const row = Math.floor(index / boardState.length);
      const col = index % boardState.length;
      cell.innerHTML = boardState[row][col];
    });

    if (this.gameOver) {
      this.displayManager.restartbutton.style.display = "block";

      if (this.lastWinner === this.player1) {
        this.displayManager.p1scoretext.innerHTML = this.player1.getScore();
        wintxt.textContent = this.lastWinner.getName() + " wins!";
      } else if (this.lastWinner === this.player2) {
        this.displayManager.p2scoretext.innerHTML = this.player2.getScore();
        wintxt.textContent = this.lastWinner.getName() + " wins!";
        return;
      } else {
        wintxt.textContent = "Draw!";
        return;
      }
    } else {
      wintxt.textContent =
        this.whoseTurn.getName() + " your turn, make your move.";
    }
  };

  this.initListeners = function () {
    this.displayManager.gridcells.forEach((cell) => {
      cell.addEventListener("click", () =>
        this.playTurn(cell.getAttribute("x"), cell.getAttribute("y"))
      );
    });
    this.displayManager.restartbutton.addEventListener("click", () =>
      this.restartGame()
    );
  };

  this.changeTurn = function () {
    this.whoseTurn = this.whoseTurn === player1 ? player2 : player1;
  };
  this.changeSides = function () {
    if (this.player1.playerNumber === 1) {
      this.whoseTurn = this.player2;
      this.player1.playerNumber = 2;
      this.player2.playerNumber = 1;
    } else {
      this.whoseTurn = this.player1;
      this.player1.playerNumber = 1;
      this.player2.playerNumber = 2;
    }
  };
  this.restartGame = function () {
    this.displayManager.restartbutton.style.display = "none";
    this.gameOver = false;
    this.changeSides();
    this.board.resetBoard();
    this.grfUpdate();
  };

  this.checkWinCondition = function () {
    const bsize = this.board.getBoard().length;
    function checkEquals(linetocheck) {
      return linetocheck.every(
        (cell) => cell !== " " && cell === linetocheck[0]
      );
    }

    // Row check
    for (let row = 0; row < bsize; row++) {
      if (checkEquals(this.board.getBoard()[row])) {
        return this.board.getBoard()[row][0]; // Returns 〇 or ✖ if winning row is detected
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
    if (!this.board.getBoard().some((row) => row.includes(" "))) {
      return "Draw";
    }

    return null;
  };

  this.playTurn = function (x, y) {
    if (!this.gameOver) {
      const row = x;
      const col = y;

      if (this.board.addMark(this.whoseTurn.getMark(), row, col)) {
        if (this.checkWinCondition()) {
          this.endGame();
          this.grfUpdate();
        }

        this.changeTurn();
        this.grfUpdate();
      }
    }
  };

  this.endGame = function () {
    this.gameOver = true;

    if (this.checkWinCondition() === this.player1.getMark()) {
      this.lastWinner = this.player1;
      this.player1.addScore();
    } else if (this.checkWinCondition() === this.player2.getMark()) {
      this.lastWinner = this.player2;
      this.player2.addScore();
    } else {
      this.lastWinner = null;
    }
  };
}

const startbtn = document.getElementById("startgamebtn");

startbtn.addEventListener("click", startGame);

function startGame() {
  let p1name;
  let p2name;
  do {
    p1name = prompt("Player 1, what's your name?");
    p2name = prompt("Player 2, what's your name?");
  } while (!p1name || !p2name);
  const player1 = new Player(p1name, 1);
  const player2 = new Player(p2name, 2);
  const board = new Gameboard();
  const displayman = new DisplayManager();
  const GM = new GameManager(player1, player2, board, displayman);
  GM.newGame();
}
