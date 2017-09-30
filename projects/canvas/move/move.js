const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

var canvas = document.getElementById("frame");
var ctx = canvas.getContext("2d");

canvas.height = HEIGHT;
canvas.width = WIDTH;

const param = {
}

function render(){
}

setInterval(render, 50);