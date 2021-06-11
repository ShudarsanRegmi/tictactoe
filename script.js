"use strict";
// Dom elements
const cells = document.getElementsByClassName("cell");
const resetBtn = document.getElementById("resetButton");
const gameOverBox = document.getElementById("gameOverBox");
const winnerBox = document.getElementById("winnerBox");
const playerNames = document.getElementsByClassName("playerName");
const scores = document.getElementsByClassName("score");
let scoreBoxes = document.getElementsByClassName("scoreBoxes");
const tieScoreBoxes = document.getElementsByClassName("tieScore");
const outerBox = document.getElementById("outerbox");
const welcomeBox = document.getElementById("welcome");
const gameStartBtn = document.getElementById("gameStartBtn");
const doNotAskCheckBox = document.getElementById("doNotAskCheckBox");
const p1Name = document.getElementById("p1Name");
const p2Name = document.getElementById("p2Name");
// loading all audio elements
const player1Audio = new Audio("./audios/player1.mp3");
const player2Audio = new Audio("./audios/player2.mp3");
const gameOverAudio = new Audio("./audios/gameOver.mp3");
const tieGameAudio = new Audio("./audios/tie.mp3");


// Making the user fill the player's name from
  welcomeBox.style.display = "block";
  outerbox.style.display = "none";
  gameStartBtn.addEventListener("click",event=>{
    outerbox.style.display = "grid";
    welcomeBox.style.display = "none";
    players[0].name = p1Name.value;
    players[1].name = p2Name.value;
    playerNames[0].innerText = players[0].name;
    playerNames[1].innerText = players[1].name;
    playerNames[3].innerText = players[0].name;
    playerNames[4].innerText = players[1].name;

  })
// Game variables
let player1Name = p1Name.value;
let player2Name = p2Name.value;
let gamePlayArea = [" ", " ", " "," "," "," "," "," ", " "];
let player1Sign = "O";
let player2Sign = "X";
let indicateColor = "violet";
class Player {
  constructor(name,playerSign) {
    this.name = name;
    this.symbol = playerSign;
    this.score = 0;
  }
}
let players = [new Player(player1Name,player1Sign),new Player(player2Name,player2Sign)];
window.onload = function() {
  gameManager.start();
  gameManager.setTurn()
  gameManager.indicateTurn();
}
// Game initialization
let startTurn = players[0].name;

// game manager
let gameManager = {
  turnValue: 0,
  gameOver: false,
  winner:null,
  tieScore:0,
  setTurn() {
    this.turn = players[this.turnValue]
  },
  start() {
    console.log
    playerNames[0].innerText = players[0].name;
    playerNames[1].innerText = players[1].name;
    playerNames[3].innerText = players[0].name;
    playerNames[4].innerText = players[1].name;
    Array.from(cells).forEach(item=>{
      item.addEventListener("click",event=>{
        let cell = event.target;
        if(cell.innerText == " " || cell.innerText == "") {
          this.updateGame(cell,this.turn);
          this.isGameOver();
          if(this.gameOver == true) {
            console.log("game over")
            gameOverAudio.play();
            this.showWinner();
            resetBtn.addEventListener("click",this.resetGame)
            }else{
            console.log("Game is not over")
            if(this.isTie()) {
              tieGameAudio.play();
              console.log("Game Tied");
              this.showWinner(true);
              resetBtn.addEventListener("click",this.resetGame)
            }
            this.turnUpdate();
          }
          this.updateScore();

        }else{
          console.log("already filled")
        }
      })
    })
  },
  turnUpdate() {
    let currentTurnValue = this.turnValue;
    let totalPlayers = players.length;
    if(currentTurnValue == totalPlayers-1) {
      this.turnValue = 0;
    }else{
      this.turnValue++;
    }
    this.turn = players[this.turnValue]
    if(this.turn.name == players[0].name) {
      player1Audio.play();
    }else{
      player2Audio.play();
    }
    this.indicateTurn();
  },
  updateGame(cell,player) {
    // console.log(cell)
    // console.log(player)
    gamePlayArea[cell.id] = player.symbol;
    cell.innerText = player.symbol;
    console.log(gamePlayArea)
  },
  isGameOver() {
    let winningSchemes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    winningSchemes.forEach(item=>{
      let player1Count = 0;
      let player2count = 0;
      item.forEach(item2=>{
        if(gamePlayArea[item2] == players[0].symbol) {
          player1Count++;
        }else if(gamePlayArea[item2] == players[1].symbol) {
          player2count++;
        }else{
          //
        }
      })
      if(player1Count == 3) {
        console.log("player1 won the game")
        this.gameOver = true;
        this.winner = players[0];
        this.winner.score++;
      }else if(player2count == 3) {
        console.log("player2 won the game")
        this.gameOver = true;
        this.winner = players[1];
        this.winner.score++;
      }else{
      }
    })

  },
  isTie(){
    let count = 0;
    gamePlayArea.forEach(item=>{
      if(item == players[0].symbol || item == players[1].symbol) {
        count++
      }
    })
    console.log("Count = ",count)
    if(count == 9) {
      console.log("Game tie")
      this.tieScore++;
      return true;
    }
  },

  resetGame() {
    gameManager.start();
    gamePlayArea = [" ", " ", " "," "," "," "," "," ", " "];
    Array.from(cells).forEach(item=>{
      item.innerText = " ";
    })
    gameOverBox.style.display = "none";
    outerbox.style.display = "grid";
    gameManager.gameOver = false;
  },
  showWinner(tie) {
    if(tie) {
      winnerBox.innerText = "Game Tied";
    }else{
      let winner = this.winner;
      winnerBox.innerText = `${winner.name} won the game!`;
    }
    gameOverBox.style.display = "block";
    outerbox.style.display = "none";
  },
  updateScore() {
    // console.log(scores)
    scores[0].innerText = players[0].score;
    scores[1].innerText = players[1].score;
    scores[2].innerText = players[0].score;
    scores[3].innerText = players[1].score;
    tieScoreBoxes[0].innerText = this.tieScore;
    tieScoreBoxes[1].innerText = this.tieScore;
  },
  indicateTurn() {
    let turnValue = this.turnValue;
    if(this.turnValue == 0 ) {
      playerNames[3].style.backgroundColor = indicateColor;
      playerNames[4].style.backgroundColor = "";
      console.log("turn = ",playerNames[0])
    }else if(this.turnValue == 1){
      playerNames[3].style.backgroundColor = "";
      playerNames[4].style.backgroundColor = indicateColor;


    }else{

    }
  }

}
