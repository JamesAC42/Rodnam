var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var winWidth = 1000;
var winHeight = 600;

canvas.width = winWidth;
canvas.height = winHeight;

function Point (x,y) {
	this.x = x;
	this.y = y;
}

var score, extra, apple, angle;
var startSegment = new Point(0, 0);
var segments = [];
var loseCondition = true;
var paused = false;

function startGame(){
	segments = [startSegment];
	score = 1;
	extra = 0;
	angle = 0;
	loseCondition = false;
	paused = false;
	apple = randomPoint();
}

function render(){
	ctx.fillStyle ="#000";
	ctx.fillRect(0,0,winWidth,winHeight);
	let front = segments[0];
	let newSegment = new Point(front.x, front.y);
	let xt = Math.round(Math.cos(angle) * 5);
	let yt = -1 * Math.round(Math.sin(angle) * 5);
	newSegment.x += xt;
	newSegment.y += yt;

	if (!extra) {
		segments.splice(segments.length - 1, 1);
	} else {
		extra -= 1
	}

	segments.splice(0, 0, newSegment);

	ctx.fillStyle = "#31F431";
	segments.forEach(function(item, index){
		ctx.beginPath();
		ctx.arc(item.x, item.y, 10, 0, 2 * Math.PI);
		ctx.fill();
	});
}

function randomPoint(){
	let newX = Math.floor((Math.random() * winWidth));
	let newY = Math.floor((Math.random() * winHeight));
	let newPoint = new Point(newX, newY);
	return newPoint;
}

setInterval(function(){
	if(!loseCondition && !paused){
		render();
	}
},20);

$(document).ready(function(){
	var padOffset = $("#joystick").offset();
	var padX = padOffset.left + 100;
	var padY = padOffset.top + 100;
	$("#joystick")
	.mousemove(function(e){
		let mouseX = e.pageX;
		let mouseY = e.pageY;
		let x = mouseX - padX;
		let y = mouseY -padY;
		angle = -1 * Math.atan(y/x);
		if (x < 0) angle += Math.PI;
		if (angle < 0) angle += 2 * Math.PI;
		let yt = -1 * Math.round(Math.sin(angle) * 50) - 50;
		let xt = Math.round(Math.cos(angle) * 50) - 50;
		let valString = "translate(" + xt + "px, " + yt + "px)";
		$(".handle").css("transform", valString);
	})
	.mouseleave(function(){
		$(".handle").css("transform", "translate(-50%, -50%)");
	})
	.click(function(){
		extra = 10;
	});
});


startGame();