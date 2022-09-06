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
const dice = document.querySelectorAll('.dice');
const winner = document.querySelector('.main__player');
const { shadow, gameRules, pauseGame, winPop } = popUps;
const { playboard, desktop, topPart, bottomPart } = playboards;
const { pauseBtn, holdBtn, rollBtn, returnToGameBtn, resetBtn } = btns;
const { topScrP1, topScrP2, curScrP1, curScrP2 } = numbersVar;

let arr = [];
let number, sum;
let finalScore = 100;

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
	addHiddenDice();
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
	addHiddenDice();
	const calculateTopScr = (topScr, curScr) => {
		topScr.textContent =
			Number(curScr.textContent) + Number(topScr.textContent);
		curScr.textContent = 0;
		if (Number(topScr.textContent) >= finalScore) {
			showWinPop();
			winner.textContent = 'First ';
		}
	};

	if (topPart.classList.contains('current-player')) {
		calculateTopScr(topScrP1, curScrP1);
	} else {
		calculateTopScr(topScrP2, curScrP2);
	}
	changePlayer();
};

const addHiddenDice = () => {
	dice.forEach(el => {
		el.classList.add('hidden');
	});
};
const appropriateDice = () => {
	const addHiddenDice = element => {
		dice.forEach(el => {
			el.classList.add('hidden');
		});
		element.classList.remove('hidden');
	};
	switch (
		number === 1 ||
		number === 2 ||
		number === 3 ||
		number === 4 ||
		number === 5 ||
		number === 6
	) {
		case number === 1:
			addHiddenDice(dice[0]);

			break;
		case number === 2:
			addHiddenDice(dice[1]);

			break;
		case number === 3:
			addHiddenDice(dice[2]);

			break;
		case number === 4:
			addHiddenDice(dice[3]);

			break;
		case number === 5:
			addHiddenDice(dice[4]);

			break;
		case number === 6:
			addHiddenDice(dice[5]);

			break;
	}
};

const rollDice = () => {
	randomNumber();
	appropriateDice();

	const calculateScr = curScr => {
		arr.push(number);
		sum = arr.reduce((a, b) => a + b, 0);
		curScr.textContent = sum;
	};

	const drawnOne = curScr => {
		arr = [];
		curScr.textContent = 0;
		setTimeout(() => {
			dice[0].classList.add('hidden');
		}, 500);
		changePlayer();
	};

	if (topPart.classList.contains('current-player')) {
		if (number >= 2) {
			calculateScr(curScrP1);
		} else {
			drawnOne(curScrP1);
		}
	} else {
		if (number >= 2) {
			calculateScr(curScrP2);
		} else {
			drawnOne(curScrP2);
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
