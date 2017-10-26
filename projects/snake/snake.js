var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var winHeight = 500;
var winWidth = 1000;

c.height = winHeight;
c.width = winWidth;

function Point(x,y){
	this.x = x;
	this.y = y;
}

var params = {
	"segmentSize":10,
	"direction":"down",
}

var score, extra, apple;
var startSegment = new Point(0, 0);
var segments = [];
var falseCollide = false;
var loseCondition = true;
var paused = false;

ctx.font = "32px monospace";
ctx.textAlign = "center";

function startGame(){
	segments = [startSegment];
	score = 1;
	extra = 0;
	loseCondition = false;
	paused = false;
	apple = randomPoint();
	hideInfo();
}

function render(){
	ctx.fillStyle = "#000";
	ctx.fillRect(0,0,winWidth,winHeight);
	let front = segments[0];
	let newSegment = new Point(front.x, front.y);
	switch(params.direction){
		case "left":
			newSegment.x -= 10;
			break;
		case "right":
			newSegment.x += 10;
			break;
		case "up":
			newSegment.y -= 10;
			break;
		case "down":
			newSegment.y += 10;
			break;
	}
	if (newSegment.x < 0) {
		newSegment.x = winWidth - params.segmentSize;
	} else if (newSegment.x == winWidth) {
		newSegment.x = 0;
	}
	if (newSegment.y < 0) {
		newSegment.y = winHeight - params.segmentSize;
	} else if (newSegment.y == winHeight) {
		newSegment.y = 0;
	}

	if(snakeExistsThere(newSegment, 1)){
		if(falseCollide){
			switch(params.direction){
				case "left":
					newSegment.x += 10;
					params.direction = "right";
					break;
				case "right":
					newSegment.x -= 10;
					params.direction = "left";
					break;
				case "up":
					newSegment.y -= 10;
					params.direction = "down";
					break;
				case "down":
					newSegment.y -= 10;
					params.direction = "up";
					break;
			}
			falseCollide = false;
		}else{
			loseCondition = true;
		}
	}

	if (newSegment.x == apple.x && newSegment.y == apple.y) {
		let newApple = randomPoint();
		while(snakeExistsThere(newApple, 0)){
			console.log("foo");
			newApple = randomPoint();
		}
		apple.x = newApple.x;
		apple.y = newApple.y;
		extra = 5;
	} else {
		if (!extra) {
			segments.splice(segments.length - 1, 1);
		} else {
			extra -= 1;
		}
	}

	segments.splice(0, 0, newSegment);

	ctx.fillStyle = "#31F431";
	segments.forEach(function(item, index){
		ctx.fillRect(item.x, item.y, params.segmentSize, params.segmentSize);
	});
	ctx.fillStyle = "#f00";
	ctx.fillRect(apple.x, apple.y, params.segmentSize, params.segmentSize);

	document.getElementById("score").innerHTML = segments.length;

	if(loseCondition){
		ctx.fillStyle = "#0F1A30";
		ctx.fillRect(350,225,300,50);
		ctx.fillStyle = "#31F431";
		ctx.fillText("GAME OVER",500,260);
		toggleSubmitScoreButton(1);
	}
}


function snakeExistsThere(point, start){
	for (var i = start; i < segments.length; i++) {
		if(segments[i].x == point.x && segments[i].y == point.y){
			if(i == 1){
				falseCollide = true;
			}
			return true;
		}
	}
	return false;
}

function randomPoint(){
	let newX = Math.floor((Math.random() * 1000));
	newX -= newX % 10;
	let newY = Math.floor((Math.random() * 500));
	newY -= newY % 10;
	let newPoint = new Point(newX, newY);
	return newPoint;
}

document.onkeydown = function(e) {
    e = e || window.event;
    buffer = params.direction;
    switch(e.which || e.keyCode) {
    	case 37:
    		if (params.direction != "right"){
    			params.direction = "left";
    		}
    		break;
    	case 38:
    		if (params.direction != "down"){
    			params.direction = "up";
    		}
    		break;
    	case 39:
    		if (params.direction != "left"){
    			params.direction = "right";
    		}
    		break;
    	case 40:
    		if (params.direction != "up"){
    			params.direction = "down";
    		}
    		break;
    	case 80:
    		paused = !paused;
    	default:
    		return;
    }
    e.preventDefault();
}

function toggleShowScore(state){
	console.log(state, typeof(state));
	if(state==2){
		console.log('J');
		$(".scores-container").toggleClass("scores-container-visible");
		paused = !paused;
	}else if(state==1){
		$(".scores-container").addClass("scores-container-visible");
		paused = true;
	}else{
		$(".scores-container").removeClass("scores-container-visible");
		paused = false;
	}
}

function toggleSubmitScoreButton(state){
	if(state==2){
		$(".score-submit-button-container").toggleClass("score-submit-button-container-visible");
	}else if(state==1){
		$(".score-submit-button-container").addClass("score-submit-button-container-visible");
	}else{
		$(".score-submit-button-container").removeClass("score-submit-button-container-visible");
	}
}

function toggleSubmitScore(state){
	if(state==2){
		$(".score-submit-container").toggleClass("score-submit-container-visible");
	}else if(state==1){
		$(".score-submit-container").addClass("score-submit-container-visible");
	}else{
		$(".score-submit-container").removeClass("score-submit-container-visible");
	}
}

function hideInfo(){
	toggleSubmitScore(0);
	toggleSubmitScoreButton(0);
	toggleShowScore(0);
}

function submitScore(){
	var name = $("#score-input").val();
	if (name.length < 3) return;
	var score = segments.length;
	$.post("/snake/submitScore",{name, score},success=>{
		renderScores(success);
		hideInfo();
		return;
	});
}

function renderScores(data){
	var scores = JSON.parse(data);
	$(".scores").empty();
	scores.forEach((item, index) => {
		var dom = "<div class='score'>"
					+ index + ". "
					+ item.name
					+ " .......... "
					+ item.score; 
		$(".scores").append(dom);
	});
}

$(document).ready(function(){
	$.post("/snake/getHighScores",{},success=>{
		renderScores(success);
		return;
	});
});

setInterval(function(){
	if(!loseCondition && !paused){
		render();
	}
}, 45);


