var date = new Date();
var currentTime = ((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds())) - 28800;
var endTime = 32400;
var timeLeft = endTime - currentTime;

var numberWords = {
	"1":"one",
	"2":"two",
	"3":"three",
	"4":"four",
	"5":"five",
	"6":"six",
	"7":"seven",
	"8":"eigtht",
	"9":"nine",
	"0":"zero"
};

setInterval(function(){
	if((currentTime > 0) && (currentTime < endTime)){
		let wordList = numberToDigits(timeLeft);
		wordList.reverse();
		let n = 0;
		$(".number-outer-inner").each(function(){
			$(this).removeClass();
			$(this).addClass("number-outer-inner");
			$(this).addClass(wordList[n]);
			n++;
		});
		var percent = Math.floor((currentTime / endTime) * 100);
		$(".progress-bar-inner").css("width", percent + "%");
	}else{
		if(currentTime >= endTime){
			$(".number-outer-inner").each(function(){
				$(this).removeClass();
				$(this).addClass("number-outer-inner zero");
			});
			$(".progress-bar-inner").css("width", "100%");
			$(".progress-bar-inner").css("animation", "flash .5s infinite");
		}
	}
	currentTime++;
	timeLeft--;
},1000);

function numberToDigits(n){
	var s = n.toString();
	var digitList = s.split('');
	while(digitList.length !== 5){
		digitList.splice(0, 0, '0');
	}
	let wordList = [];
	digitList.forEach(function(item, index){
		wordList.push(numberWords[item]);
	});
	return wordList;
}