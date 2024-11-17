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
let currentPlayer = '';

const startGame = function () {
  interface.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn')) {
      cont.classList.remove('hidden');

      playerChoice = e.target.dataset.symbol;
      if (playerChoice === 'cross') npcChoice = 'circle';
      else npcChoice = 'cross';

      pptext.textContent = 'Player picked:';
      btnCross.classList.add('hidden');
      btnCircle.classList.add('hidden');
      playerPick.classList.remove('hidden');
      btnNew.classList.remove('hidden');

      if (!e.target.classList.contains('player-chose')) showPlayerStatus();

      enablePlayer();
      enableNPC();
    }
  });
};

const restartGame = function () {
  interface.addEventListener('click', function (e) {
    if (e.target.classList.contains('new-game')) {
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

const playGame = function () {};

const enablePlayer = function () {
  cont.addEventListener('click', function (e) {
    if (e.target.classList.contains('field')) {
      e.target.textContent = playerChoice === 'cross' ? '❌' : '⭕';
    }
  });
};
const randomField = Math.trunc(Math.random() * fields.length);

const enableNPC = function () {
  fields.forEach(field => {
    if (field === '' && playerChoice === 'cross') {
    }
  });
};

const switchPlayer = function () {};

const showPlayerStatus = function () {
  playerChoice === 'cross'
    ? (playerPick.textContent = 'Cross ❌')
    : (playerPick.textContent = 'Circle ⭕');
};

startGame();
