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

let playerChoice = '';
let npcChoice = '';
let currentPlayer = '';

const startGame = function () {
  interface.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-choose')) {
      cont.classList.remove('hidden');

      playerChoice = e.target.dataset.symbol;

      enablePlayer();
      enableNPC();
    }
  });
};

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

startGame();
