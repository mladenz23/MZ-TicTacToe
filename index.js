'use sctrict';

const fields = document.querySelectorAll('.field');
const cont = document.querySelector('#cont');
const btnCross = document.querySelector('.btn--cross');
const btnCircle = document.querySelector('.btn--circle');
const interface = document.querySelector('#interface');
const btnNew = document.querySelector('.new-game');
const playerPick = document.querySelector('.player-chose');
const pptext = document.querySelector('#pptext');
const message = document.querySelector('#endMessage');
const playerScore = document.querySelector('.playerScore');
const npcScore = document.querySelector('.npcScore');

let gridArr = [];
let playerChoice = '';
let npcChoice = '';
let currPlayer = '';
let gameStarted = false;
let playerWin = false;
let npcWin = false;
let tieGame = false;
let gameOver = false;
let isListenersAttached = false;

const startGame = function () {
  if (isListenersAttached) return;

  interface.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
      gameStarted = true;
      cont.classList.remove('hidden');
      cont.style.pointerEvents = 'auto';

      playerChoice = e.target.dataset.symbol;
      npcChoice = playerChoice === 'cross' ? 'circle' : 'cross';

      pptext.textContent = 'Current player:';
      btnCross.classList.add('hidden');
      btnCircle.classList.add('hidden');
      playerPick.classList.remove('hidden');
      btnNew.classList.remove('hidden');

      playGame();
      resetGrid();
    }
  });

  btnNew.addEventListener('click', restartGame);

  cont.addEventListener('click', function (e) {
    if (gameOver) return;
    if (e.target.classList.contains('field')) {
      if (currPlayer === playerChoice) {
        enablePlayer(e);
      }
      endGame();
    }
  });

  isListenersAttached = true;
};

const restartGame = function () {
  gameStarted = false;
  playerWin = false;
  npcWin = false;
  tieGame = false;
  gameOver = false;

  pptext.textContent = 'Player pick:';
  btnNew.classList.add('hidden');
  playerPick.classList.add('hidden');
  btnCross.classList.remove('hidden');
  btnCircle.classList.remove('hidden');
  cont.classList.add('hidden');
  message.classList.add('hidden');

  resetGrid();
  currPlayer = '';
  cont.style.pointerEvents = 'auto';
  playerPick.style.backgroundColor = 'var(--player)';
};

const playGame = function () {
  if (gameStarted) {
    if (playerChoice === 'cross') currPlayer = playerChoice;
    else {
      currPlayer = npcChoice;
      enableNPC();
    }
    playerPick.textContent =
      playerChoice === 'cross' ? 'Player ❌' : 'Player ⭕';
  }
};

const enablePlayer = function (e) {
  if (gameOver) return;
  if (e.target.classList.contains('field') && e.target.textContent === '') {
    e.target.textContent = playerChoice === 'cross' ? '❌' : '⭕';
    gridArr[e.target.dataset.arr] = e.target.textContent;

    playerPick.textContent =
      playerChoice === 'cross' ? 'Computer ⭕' : 'Computer ❌';
    playerPick.style.backgroundColor = 'var(--npc)';
    currPlayer = npcChoice;

    enableNPC();
  }
};

const enableNPC = function () {
  if (gameOver) return;

  const emptyFields = Array.from(fields).filter(
    field => field.textContent === ''
  );

  if (emptyFields.length > 0) {
    setTimeout(function () {
      const randField =
        emptyFields[Math.floor(Math.random() * emptyFields.length)];

      randField.textContent = npcChoice === 'cross' ? '❌' : '⭕';
      gridArr[randField.dataset.arr] = randField.textContent;

      playerPick.textContent =
        playerChoice === 'cross' ? 'Player ❌' : 'Player ⭕';
      playerPick.style.backgroundColor = 'var(--player)';
      currPlayer = playerChoice;

      endGame();
    }, 2000);
  }
};

const endGame = function () {
  let count = 0;
  const wc1 = gridArr[0] + gridArr[1] + gridArr[2];
  const wc2 = gridArr[3] + gridArr[4] + gridArr[5];
  const wc3 = gridArr[6] + gridArr[7] + gridArr[8];
  const wc4 = gridArr[0] + gridArr[3] + gridArr[6];
  const wc5 = gridArr[1] + gridArr[4] + gridArr[7];
  const wc6 = gridArr[2] + gridArr[5] + gridArr[8];
  const wc7 = gridArr[0] + gridArr[4] + gridArr[8];
  const wc8 = gridArr[2] + gridArr[4] + gridArr[6];
  const winConditions = [wc1, wc2, wc3, wc4, wc5, wc6, wc7, wc8];

  for (let i = 0; i < gridArr.length; i++) {
    if (gridArr[i] === '❌' || gridArr[i] === '⭕') {
      count++;
    }

    if (
      (winConditions.includes('❌❌❌') && playerChoice === 'cross') ||
      (winConditions.includes('⭕⭕⭕') && playerChoice === 'circle')
    ) {
      gameOver = true;
      playerWin = true;
      showEndMessage();
      updateScoreBoard();
      cont.style.pointerEvents = 'none';
      return;
    }

    if (
      (winConditions.includes('❌❌❌') && npcChoice === 'cross') ||
      (winConditions.includes('⭕⭕⭕') && npcChoice === 'circle')
    ) {
      gameOver = true;
      npcWin = true;
      showEndMessage();
      updateScoreBoard();
      cont.style.pointerEvents = 'none';
      return;
    }
  }

  if (count === 9) {
    gameOver = true;
    tieGame = true;
    showEndMessage();
    cont.style.pointerEvents = 'none';
  }
};

const showEndMessage = function () {
  message.classList.remove('hidden');
  message.innerHTML = '';
  const html = `
    ${tieGame ? "<p>It's a tie.</p>" : ''}
    ${playerWin ? 'You won! 🥳' : ''}
    ${npcWin ? 'Computer won! 🤖' : ''}
    <p>Start new game</p>
  `;
  const newGame = message.insertAdjacentHTML('beforeend', html);
  cont.style.pointerEvents = 'none';

  playerPick.style.backgroundColor = 'gold';
  playerPick.textContent = 'Game over';

  return newGame;
};

const updateScoreBoard = function () {
  if (playerWin) {
    scoreHelper(playerScore);
    return;
  }
  if (npcWin) {
    scoreHelper(npcScore);
    return;
  }
};

const scoreHelper = function (scr) {
  let score = +scr.textContent;
  scr.textContent = score + 1;
};

const endHelper = function () {};

const resetGrid = function () {
  fields.forEach(field => (field.textContent = ''));
  gridArr = Array(9).fill('');
};

if (!gameStarted) startGame();
