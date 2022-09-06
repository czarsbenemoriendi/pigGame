'use strict';

const playboards = {
	playboard: document.querySelector('.section__playboard'),
	topPart: document.querySelector('.top'),
	bottomPart: document.querySelector('.bottom'),
};
const btns = {
	pauseBtn: document.querySelector('.pause'),
	holdBtn: document.querySelector('.hold'),
	rollBtn: document.querySelector('.roll'),
	returnToGameBtn: document.querySelectorAll('.return'),
	resetBtn: document.querySelectorAll('.reset'),
};
const numbersVar = {
	topScrP1: document.querySelector('.section__number-info--first'),
	topScrP2: document.querySelector('.section__number-info--second'),
	curScrP1: document.querySelector('.section__current-points--first'),
	curScrP2: document.querySelector('.section__current-points--second'),
};
const popUps = {
	shadow: document.querySelector('.shadow'),
	gameRules: document.querySelector('.main__popup--game-rules'),
	pauseGame: document.querySelector('.main__popup--pausePop'),
	winPop: document.querySelector('.main__popup--win'),
};

const winner = document.querySelector('.main__player');
const { shadow, gameRules, pauseGame, winPop } = popUps;
const { playboard, desktop, topPart, bottomPart } = playboards;
const { pauseBtn, holdBtn, rollBtn, returnToGameBtn, resetBtn } = btns;
const { topScrP1, topScrP2, curScrP1, curScrP2 } = numbersVar;

let arr = [];
let number, sum;
let finalScore = 10;

const enterGame = () => {
	shadow.classList.add('hidden');
	gameRules.classList.add('hidden');
	pauseGame.classList.add('hidden');
	topPart.classList.add('current-player');
	winPop.classList.add('hidden');
	bottomPart.classList.remove('current-player');
};
const pauseGameFunction = () => {
	shadow.classList.remove('hidden');
	pauseGame.classList.remove('hidden');
};
const showWinPop = () => {
	shadow.classList.remove('hidden');
	winPop.classList.remove('hidden');
};
const resetGame = () => {
	topScrP1.textContent = 0;
	topScrP2.textContent = 0;
	curScrP1.textContent = 0;
	curScrP2.textContent = 0;
	arr = [];

	enterGame();
};
const changePlayer = () => {
	arr = [];
	topPart.classList.toggle('current-player');
	bottomPart.classList.toggle('current-player');
};
const randomNumber = () => {
	return (number = Math.trunc(Math.random() * 6 + 1));
};
const holdFunction = () => {
	if (topPart.classList.contains('current-player')) {
		topScrP1.textContent =
			Number(curScrP1.textContent) + Number(topScrP1.textContent);
		curScrP1.textContent = 0;
		if (Number(topScrP1.textContent) >= finalScore) {
			showWinPop();
			winner.textContent = 'First ';
		}
	} else {
		topScrP2.textContent =
			Number(curScrP2.textContent) + Number(topScrP2.textContent);
		curScrP2.textContent = 0;
		if (Number(topScrP2.textContent) >= finalScore) {
			showWinPop();
			winner.textContent = 'Second ';
		}
	}
	changePlayer();
};

const rollDice = () => {
	randomNumber();
	console.log(number);
	if (topPart.classList.contains('current-player')) {
		if (number >= 2) {
			console.log(arr);
			arr.push(number);
			sum = arr.reduce((a, b) => a + b, 0);
			curScrP1.textContent = sum;
		} else {
			arr = [];
			curScrP1.textContent = 0;
			changePlayer();
		}
	} else {
		if (number >= 2) {
			arr.push(number);
			sum = arr.reduce((a, b) => a + b, 0);
			curScrP2.textContent = sum;
		} else {
			arr = [];
			curScrP2.textContent = 0;
			changePlayer();
		}
	}
};

for (const btn of returnToGameBtn) {
	btn.addEventListener('click', enterGame);
}
for (const btn of resetBtn) {
	btn.addEventListener('click', resetGame);
}

holdBtn.addEventListener('click', holdFunction);
rollBtn.addEventListener('click', rollDice);
pauseBtn.addEventListener('click', pauseGameFunction);

// window.addEventListener('resize', function () {

// 	if (window.matchMedia('(min-width: 500px)').matches) {
// 		playboard.classList.add('hidden');
// 		desktop.classList.remove('hidden');
// 	} else {
// 		mobile.classList.remove('hidden');
// 		desktop.classList.add('hidden');
// 	}
// });
