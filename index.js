'use sctrict';

const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const fields = document.querySelectorAll('.field');
const cont = document.getElementById('cont');
const btnCross = document.querySelector('.btn--cross');
const btnCircle = document.querySelector('.btn--circle');
const display = document.getElementById('displayScore');
const interface = document.getElementById('interface');
const btnNew = document.querySelector('.new-game');
const playerPick = document.querySelector('.player-chose');
const pptext = document.querySelector('#pptext');

let playerChoice = '';
let npcChoice = '';
let currPlayer = '';
let gameStarted = false;

const startGame = function () {
  interface.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
      gameStarted = true;
      cont.classList.remove('hidden');

      playerChoice = e.target.dataset.symbol;
      if (playerChoice === 'cross') npcChoice = 'circle';
      else npcChoice = 'cross';

      pptext.textContent = 'Current turn:';
      btnCross.classList.add('hidden');
      btnCircle.classList.add('hidden');
      playerPick.classList.remove('hidden');
      btnNew.classList.remove('hidden');

      if (!e.target.classList.contains('player-chose')) showPlayerStatus();

      playGame();
    }
  });
};
startGame();

const restartGame = function () {
  interface.addEventListener('click', function (e) {
    if (e.target.classList.contains('new-game')) {
      gameStarted = false;
      pptext.textContent = 'Player pick:';
      btnNew.classList.add('hidden');
      playerPick.classList.add('hidden');
      btnCross.classList.remove('hidden');
      btnCircle.classList.remove('hidden');
      cont.classList.add('hidden');
      fields.forEach(field => {
        field.textContent = '';
      });
    }
  });
};
restartGame();

const playGame = function () {
  if (gameStarted) {
    currPlayer = playerChoice;
    const filledFields = [];

    cont.addEventListener('click', function (e) {
      if (currPlayer === playerChoice) {
        enablePlayer(e);
      } else if (currPlayer === npcChoice) {
        enableNPC(e);
      }
    });
  }
};

const enablePlayer = function (e) {
  if (e.target.classList.contains('field') && e.target.textContent === '') {
    e.target.textContent = playerChoice === 'cross' ? '❌' : '⭕';
    currPlayer = npcChoice;
  }
};

const enableNPC = function (e) {
  const randField = Math.trunc(Math.random() * fields.length);

  // test with manual play
  if (e.target.classList.contains('field') && e.target.textContent === '') {
    e.target.textContent = npcChoice === 'cross' ? '❌' : '⭕';
    currPlayer = playerChoice;
  }

  // implement automatic pick by computer
  fields.forEach(field => {
    // if (field === '') {
    // }
  });
};

const switchPlayer = function () {};

const showPlayerStatus = function () {
  playerChoice === 'cross'
    ? (playerPick.textContent = 'Cross ❌')
    : (playerPick.textContent = 'Circle ⭕');
};
