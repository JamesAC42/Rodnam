var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var winHeight = 600;
var winWidth = 400;

c.height = winHeight;
c.width = winWidth;

function Point(x, y){
	this.x = x;
	this.y = y;
}

var segmentSize = 20;

var currentBlock = [];

function setSquare(point){
	currentBlock = [];
	currentBlock.push(new Point(point.x, point.y));
	currentBlock.push(new Point(point.x + segmentSize, point.y));
	currentBlock.push(new Point(point.x, point.y + segmentSize));
	currentBlock.push(new Point(point.x +segmentSize, point.y + segmentSize));
	return;
}

function setI(point){
	currentBlock = [];
	for(let i = 0; i < 4; i++){
		let addition = i * segmentSize;
		currentBlock.push(new Point(point.x + addition, point.y + addition));
	}
	return;
}

function setT(point){

}

function setL(point){

}

function setS(point){

}

function setZ(point){

}