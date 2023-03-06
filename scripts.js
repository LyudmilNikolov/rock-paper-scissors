const options = document.querySelectorAll(".options");

let playerScore = 0
let computerScore = 0
let roundWinner = ''

options.forEach((option) => {
  option.addEventListener("click", function () {
    if (isGameOver()){
        openEndgameModal()
        return
    }

    const pInput = this.querySelector('img').getAttribute('alt');

    compareInputs(pInput, getComputerChoice());
    updateScore()

    if (isGameOver()){
        openEndgameModal()
        setFinalMessage()
    }
  });
});

function getComputerChoice(){
    const cOptions = ["Rock", "Paper", "Scissors"];
    return cOptions[Math.floor(Math.random() * 3)]
}

function getRoundWinner(player, computer) {
    const results = {
      ROCK: { SCISSORS: 'player', PAPER: 'computer' },
      SCISSORS: { PAPER: 'player', ROCK: 'computer' },
      PAPER: { ROCK: 'player', SCISSORS: 'computer' },
    };
  
    if (player === computer) {
      return 'tie';
    }
  
    return results[player.toUpperCase()][computer.toUpperCase()];
}
  
function compareInputs(player, computer) {
    const roundWinner = getRoundWinner(player, computer);
  
    if (roundWinner === 'player') {
      playerScore++;
    } else if (roundWinner === 'computer') {
      computerScore++;
    }
  
    updateScoreMessage(roundWinner, player, computer);
}
  

function updateScore() {
    switch (roundWinner) {
      case 'tie':
        scoreInfo.textContent = "It's a tie!";
        break;
      case 'player':
        scoreInfo.textContent = 'You won!';
        break;
      case 'computer':
        scoreInfo.textContent = 'You lost!';
        break;
      default:
        break;
    }
  
    playerScorePara.textContent = `Player: ${playerScore}`;
    computerScorePara.textContent = `Computer: ${computerScore}`;
}  

function getMessageForPlayerWin(player, computer) {
    return `${capitalizeFirstLetter(player)} beats ${computer.toLowerCase()}`;
}
  
function getMessageForComputerWin(player, computer) {
    return `${capitalizeFirstLetter(player)} is beaten by ${computer.toLowerCase()}`;
}
  
function getMessageForTie(player, computer) {
    return `${capitalizeFirstLetter(player)} ties with ${computer.toLowerCase()}`;
}
  
function updateScoreMessage(winner, player, computer) {
    let message;
  
    switch (winner) {
      case 'player':
        message = getMessageForPlayerWin(player, computer);
        break;
      case 'computer':
        message = getMessageForComputerWin(player, computer);
        break;
      default:
        message = getMessageForTie(player, computer);
        break;
    }
  
    scoreMessage.textContent = message;
}
  

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const isGameOver = () => playerScore === 5 || computerScore === 5;

const setFinalMessage = () => endgameMsg.textContent = playerScore > computerScore ? 'You won!' : 'You lost...';

const openEndgameModal = () => endgameModal.classList.add('active');


//UI
const {scoreMessage, playerScorePara, computerScorePara, endgameModal, endgameMsg, restartBtn} = {
    scoreMessage: document.getElementById('scoreMessage'),
    playerScorePara: document.getElementById('playerScore'),
    computerScorePara: document.getElementById('computerScore'),
    endgameModal: document.getElementById('endgameModal'),
    endgameMsg: document.getElementById('endgameMsg'),
    restartBtn: document.getElementById('restartBtn')
};
  
restartBtn.addEventListener('click', restartGame);

function resetScore() {
    playerScore = 0;
    computerScore = 0;
}
  
function endupdateScoreMessage() {
    scoreMessage.textContent = 'First to score 5 points wins the game';
    playerScorePara.textContent = `Player: ${playerScore}`;
    computerScorePara.textContent = `Computer: ${computerScore}`;
}
  
function hideEndgameModal() {
    endgameModal.classList.remove('active');
}
  
function restartGame() {
    resetScore();
    endupdateScoreMessage();
    hideEndgameModal();
}
  