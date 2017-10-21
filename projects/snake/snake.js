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
var loseCondition = true;

function startGame(){
	segments = [startSegment];
	score = 1;
	extra = 0;
	loseCondition = false;
	apple = randomPoint();
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
		loseCondition = true;
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
		ctx.fillRect(item.x, item.y, params.segmentSize, params.segmentSize)
	});
	ctx.fillStyle = "#f00";
	ctx.fillRect(apple.x, apple.y, params.segmentSize, params.segmentSize);

	document.getElementById("score").innerHTML = segments.length;
}

function snakeExistsThere(point, start){
	for (var i = segments.length - 1; i >= start; i--) {
		if(segments[i].x == point.x && segments[i].y == point.y){
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
    	default:
    		return;
    }
    e.preventDefault();
}

setInterval(function(){
	if(!loseCondition){
		render();
	}
}, 50);


