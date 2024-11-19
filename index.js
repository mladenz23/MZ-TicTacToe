'use sctrict';

const fields = document.querySelectorAll('.field');
const cont = document.querySelector('#cont');
const btnCross = document.querySelector('.btn--cross');
const btnCircle = document.querySelector('.btn--circle');
const display = document.querySelector('#displayScore');
const interface = document.querySelector('#interface');
const btnNew = document.querySelector('.new-game');
const playerPick = document.querySelector('.player-chose');
const pptext = document.querySelector('#pptext');
const message = document.querySelector('#endMessage');

let gridArr = [];
let playerChoice = '';
let npcChoice = '';
let currPlayer = '';
let gameStarted = false;
let playerWin = false;
let npcWin = false;
let gameOver = false;

const startGame = function () {
  interface.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
      gameStarted = true;
      cont.classList.remove('hidden');

      playerChoice = e.target.dataset.symbol;
      if (playerChoice === 'cross') npcChoice = 'circle';
      else npcChoice = 'cross';

      pptext.textContent = 'Current player:';
      btnCross.classList.add('hidden');
      btnCircle.classList.add('hidden');
      playerPick.classList.remove('hidden');
      btnNew.classList.remove('hidden');

      playGame();
      restartGame();
    }
  });
};

const restartGame = function () {
  interface.addEventListener('click', function (e) {
    if (e.target === btnNew) {
      gameStarted = false;
      pptext.textContent = 'Player pick:';
      btnNew.classList.add('hidden');
      playerPick.classList.add('hidden');
      btnCross.classList.remove('hidden');
      btnCircle.classList.remove('hidden');
      cont.classList.add('hidden');
      fields.forEach(field => (field.textContent = ''));
      gridArr = [];
      message.classList.add('hidden');
    }
  });
};

const playGame = function () {
  if (gameStarted) {
    currPlayer = playerChoice;
    playerPick.textContent =
      playerChoice === 'cross' ? 'Player ❌' : 'Player ⭕';

    cont.addEventListener('click', function (e) {
      if (currPlayer === playerChoice) {
        enablePlayer(e);
      } else if (currPlayer === npcChoice) {
        enableNPC(e);
      }
      endGame();
    });
  }
};

const enablePlayer = function (e) {
  if (e.target.classList.contains('field') && e.target.textContent === '') {
    e.target.textContent = playerChoice === 'cross' ? '❌' : '⭕';
    gridArr[e.target.dataset.symbol] = e.target.textContent;
    playerPick.textContent =
      playerChoice === 'cross' ? 'Computer ⭕' : 'Computer ❌';
    currPlayer = npcChoice;
  }
};

const enableNPC = function (e) {
  const randField = Math.trunc(Math.random() * fields.length);

  // test with manual play
  if (e.target.classList.contains('field') && e.target.textContent === '') {
    e.target.textContent = npcChoice === 'cross' ? '❌' : '⭕';
    gridArr[e.target.dataset.symbol] = e.target.textContent;
    playerPick.textContent =
      playerChoice === 'cross' ? 'Player ❌' : 'Player ⭕';
    currPlayer = playerChoice;
  }

  // implement automatic pick by computer
  fields.forEach(field => {
    // if (field === '') {
    // }
  });
};

const endGame = function () {
  let count = 0;
  let winCombo = 0;
  for (let i = 0; i < gridArr.length; i++) {
    if (gridArr[i] === '❌' || gridArr[i] === '⭕') {
      count++;
    }

    // win combo logic
  }

  if (count === 9) {
    gameOver = true;
    endGameMsg();
  }
};

const endGameMsg = function () {
  message.classList.remove('hidden');
  message.innerHTML = '';
  const html = `
    ${gameOver ? "<p>It's a tie.</p>" : ''}
    ${playerWin ? 'You won! 🥳' : ''}
    ${npcWin ? 'Computer won! 🤖' : ''}
    <p>Start new game</p>
  `;
  const newGame = message.insertAdjacentHTML('beforeend', html);
  cont.style.pointerEvents = 'none';
  return newGame;
};

startGame();
