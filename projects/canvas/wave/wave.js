const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

var canvas = document.getElementById("frame");
var ctx = canvas.getContext("2d");

canvas.height = HEIGHT;
canvas.width = WIDTH;

const param = {
	"size":20,
	"color": "#1a75ff"
}

var amt = WIDTH / param.size;
var rects = [];
for(let i = 0;i < amt;i++){
	let rect = {
		"x":i*param.size,
		"y":-1 * i,
		"height":param.size,
		"width":param.size,
		"d":5
	};
	rects.push(rect);
}

function render(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	ctx.beginPath();
	rects.forEach(function(item, index){
		ctx.strokeStyle = param.color;
		ctx.strokeRect(item.x, item.y, item.height, item.width);
		item.y += item.d;
		if(item.y > HEIGHT){item.d *= -1}
	});
}

setInterval(render, 50);