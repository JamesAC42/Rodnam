const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

const scoreDisplay = document.getElementById("score");

const params = {
	blockWidth: 17,
	blockHeight: 28,
	blockSize: 20
};

const winHeight = params.blockHeight * params.blockSize;
const winWidth = params.blockWidth * params.blockSize;

c.height = winHeight;
c.width = winWidth;

function Point(x, y){
	this.x = x;
	this.y = y;
}

let board = [];

for (let row = 0; row < params.blockHeight; row++) {
	let temp = [];
	for (let col = 0; col < params.blockWidth; col++) {
		temp.push(0);
	}
	board.push(temp);
}

const tetrominoNames = ["L","J","O","S","Z","I","T"];

const tetrominoes = {
	L: {
		angles: {
			0: [
				[1,0],
				[1,0],
				[1,1]
			],
			90: [
				[1,1,1],
				[1,0,0]
			],
			180: [
				[1,1],
				[0,1],
				[0,1]
			],
			270: [
				[0,0,1],
				[1,1,1]
			]
		},
		color: "#2eb8b8"
	},
		
	J: {
		angles: {
			0: [
				[0,1],
				[0,1],
				[1,1]
			],
			90: [
				[1,0,0],
				[1,1,1]
			],
			180: [
				[1,1],
				[1,0],
				[1,0]
			],
			270: [
				[1,1,1],
				[0,0,1]
			]
		},
		color: "#66ffb3"
	},

	O: {
		angles: {
			0: [
				[1,1],
				[1,1]
			],
			90: [
				[1,1],
				[1,1]
			],
			180: [
				[1,1],
				[1,1]
			],
			270: [
				[1,1],
				[1,1]
			],
		},
		color: "#6666ff"
	},

	T: {
		angles: {
			0: [
				[1,1,1],
				[0,1,0]
			],
			90: [
				[0,1],
				[1,1],
				[0,1]
			],
			180: [
				[0,1,0],
				[1,1,1]
			],
			270: [
				[1,0],
				[1,1],
				[1,0]
			]
		},
		color: "#ff80aa"
	},

	S: {
		angles: {
			0: [
				[0,1,1],
				[1,1,0]
			],
			90: [
				[1,0],
				[1,1],
				[0,1]
			],
			180: [
				[0,1,1],
				[1,1,0]
			],
			270: [
				[1,0],
				[1,1],
				[0,1]
			]
		},
		color: "#ffcc66"
	},

	Z: {
		angles: {
			0: [
				[1,1,0],
				[0,1,1]
			],
			90: [
				[0,1],
				[1,1],
				[1,0]
			],
			180: [
				[1,1,0],
				[0,1,1]
			],
			270: [
				[0,1],
				[1,1],
				[1,0]
			]
		},
		color: "#9494b8"
	},

	I: {
		angles: {
			0: [
				[1],
				[1],
				[1],
				[1]
			],
			90: [
				[1,1,1,1]
			],
			180: [
				[1],
				[1],
				[1],
				[1]
			],
			270: [
				[1,1,1,1]
			]
		},
		color: "#9fff80"
	},
	 
}

let activePoint;
let activePiece;
let activeAngle = 0;

let start = new Date().getTime();
let fallIncrement =  700; //ms

let fallenColor;

let gameOver = false;
let pause = false;

let score = 0;
let nextLevel = 1000;

document.addEventListener('keydown', ev => {
	switch (ev.which) {
		case 37:
			moveActiveSide(-1);
			break;
		case 38:
			rotateActive();
			break;
		case 39:
			moveActiveSide(1)
			break;
		case 40:
			moveActiveDown();
			break;
		case 80:
			togglePause();
			break;
		default:
			break;
	}
});

function togglePause() {
	pause = !pause;
}

function randomColor() {
	let result = "rgb(";
	for(let i = 0; i < 3; i++) {
		let color = Math.floor(Math.random() * 255);
		result += color;
		if (i == 2) {
			result += ")";
		} else {
			result += ",";
		}
	}
	return result;
}

function renderFalling() {
	let x = activePoint.x;
	let y = activePoint.y;
	let piece = tetrominoes[activePiece]["angles"][activeAngle];
	for (let row = 0; row < piece.length; row++) {
		for (let column = 0; column < piece[row].length; column++) {
			if (piece[row][column]) {
				ctx.strokeStyle = "#ffffff";
				ctx.beginPath();
				ctx.rect((column + x) * params.blockSize, (row + y) * params.blockSize, params.blockSize, params.blockSize);
				ctx.stroke();
				ctx.fillStyle = tetrominoes[activePiece]["color"];
				ctx.fillRect((column + x) * params.blockSize, (row + y) * params.blockSize, params.blockSize, params.blockSize);
			}
		}
	}
}

function renderFallen() {
	ctx.fillStyle = '#404040';
	ctx.fillRect(0,0, c.width, c.height);
	ctx.fillStyle = fallenColor;
	for (let row = 0; row < board.length; row++) {
		for (let column = 0; column < board[row].length; column++) {
			if (board[row][column]) {
				ctx.strokeStyle = "#ffffff";
				ctx.beginPath();
				ctx.rect(column * params.blockSize, row * params.blockSize, params.blockSize, params.blockSize);
				ctx.stroke();
				ctx.fillRect(column * params.blockSize, row * params.blockSize, params.blockSize, params.blockSize);
			}
		}
	}
}

function newActive() {
	activePoint = new Point(Math.floor(params.blockWidth / 2), -1);
	activePiece = tetrominoNames[Math.floor(Math.random()*tetrominoNames.length)]; 
}

function placePiece(piece, x, y) {
	for (let row = 0; row < piece.length; row++) {
		for (let col = 0; col < piece[row].length; col++) {
			if (!board[row + y][col + x]) {
				board[row + y][col + x] = piece[row][col];
			}
		}
	}
}

function moveActiveDown() {
	let x = activePoint.x;
	let y = activePoint.y;
	let piece = tetrominoes[activePiece]["angles"][activeAngle];
	for (let row = 0; row < piece.length; row++) {
		for (let col = 0; col < piece[row].length; col++) {
			let boardRow = y + row + 1;
			let boardCol = x + col;
			if (boardRow === params.blockHeight) {
				newActive();
				placePiece(piece, x, y);
			} else {
				if (board[boardRow][boardCol] && piece[row][col]) {
					newActive();
					placePiece(piece, x, y);
				}
			}
		}
	}
	activePoint.y++;
}

function moveActiveSide(direction) {
	let x = activePoint.x;
	let y = activePoint.y;
	let piece = tetrominoes[activePiece]["angles"][activeAngle];
	for (let row = 0; row < piece.length; row++) {
		for (let col = 0; col < piece[row].length; col++) {
			let boardRow = y + row;
			let boardCol = x + col + direction;
			if (boardCol === params.blockWidth || boardCol < 0) {
				return false;
			} else {
				if (board[boardRow][boardCol] && piece[row][col]) {
					return false;
				}
			}
		}
	}
	activePoint.x += direction;
}

function rotateActive() {
	let x = activePoint.x;
	let y = activePoint.y;
	let tempAngle = (activeAngle === 270) ? 0 : activeAngle + 90;
	let tempPiece = tetrominoes[activePiece]["angles"][tempAngle];
	for (let row = 0; row < tempPiece.length; row++) {
		for (let col =0; col < tempPiece[row].length; col++) {
			let boardRow = y + row;
			let boardCol = x + col;
			if(board[boardRow][boardCol] && tempPiece[row][col]) {
				return false;
			}
		}
	}
	activeAngle = tempAngle;
}

function checkClear() {
	let moveDown = false;
	let scoreAdd = 0;
	let buffer = -1;
	for (let row = board.length - 1; row >= 0; row--) {
		if (moveDown) {
			board[row + 1] = board[row]
		}
		if (board[row].indexOf(0) === -1) {
			if (buffer - row === 1) {
				scoreAdd += 200;
			} else {
				scoreAdd += 100;
			}
			buffer = row;
			moveDown = true;
		}
	}
	score += scoreAdd;
	scoreDisplay.innerHTML = score;
	if (score >= nextLevel) {
		fallIncrement *= 0.85;
		nextLevel *= 1.40;
		fallenColor = randomColor();
		console.log(fallenColor);
	}
}

function checkGameOver() {
	if (board[0].indexOf(1) !== -1) {
		gameOver = true;
	}
}

function render() {
	if (!gameOver && !pause) {
		if (new Date().getTime() - start > fallIncrement) {
			moveActiveDown();
			start = new Date().getTime();
		}
		renderFallen();
		renderFalling();
		checkClear();
		checkGameOver();
	}
	setTimeout(render,5);
};

function startGame() {
	fallenColor = randomColor();
	newActive();
	render();
}

startGame();
