var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var winHeight = 500 //window.innerHeight - 50;
var winWidth = 1000 //window.innerWidth - 50;

c.height = winHeight;
c.width = winWidth;

function Point(x,y){
	this.x = x;
	this.y = y;
}

var params = {
	"segmentSize":10,
	"direction":"down",
	"appleColor":"#f00"
}

ctx.fillStyle = params.appleColor;

let startSegment = new Point(0, 0);

let appleX = Math.floor((Math.random() * 1000) + 1);
appleX -= appleX % 10;
let appleY = Math.floor((Math.random() * 500) + 1);
appleY -= appleY % 10;
let apple = new Point(appleX, appleY);
console.log(appleX, appleY);

var segments = [startSegment];
var extra = 0;

function render(){
	ctx.clearRect(0,0,winWidth,winHeight);
	let front = segments[0];
	let newSegment = new Point(front.x, front.y);
	switch(params.direction){
		case "left":
			newSegment.x = front.x - 10;
			break;
		case "right":
			newSegment.x = front.x + 10;
			break;
		case "up":
			newSegment.y = front.y - 10;
			break;
		case "down":
			newSegment.y = front.y + 10;
	}

	if(newSegment.x == apple.x && newSegment.y == apple.y){
		let newAppleX, newAppleY;
		let validPoint = false;
		while(!validPoint){
			newAppleX = Math.floor((Math.random() * 1000) + 1);
			newAppleX -= newAppleX % 10;
			newAppleY = Math.floor((Math.random() * 500) + 1);
			newAppleY -= newAppleY % 10;
			segments.forEach(function(item, index){

			});
		}
		apple.x = newAppleX;
		apple.y = newAppleY;
		extra = 5;
	} else {
		if (!extra) {
			segments.splice(segments.length - 1, 1);
		} else {
			extra -= 1;
		}
	}

	segments.splice(0, 0, newSegment);

	segments.forEach(function(item, index){
		ctx.strokeRect(item.x, item.y, params.segmentSize, params.segmentSize)
	});
	ctx.fillStyle = "#f00";
	ctx.fillRect(apple.x, apple.y, params.segmentSize, params.segmentSize);
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

setInterval(render, 50);


