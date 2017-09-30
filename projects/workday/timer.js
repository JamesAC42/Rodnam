var date = new Date();
var currentTime = 0;
var endTime = 0;
var timeLeft = 0;
var mode;

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

function renderTime(){
	if((currentTime > 0) && (currentTime < endTime)){
		let wordList = numberToDigits(timeLeft);
		wordList.reverse();
		let n = 0;
		$(".number-outer-inner").each(function(){
			$(this).removeClass();
			$(this).addClass("number-outer-inner");
			$(this).addClass(wordList[n]);
			if(precZero(wordList, n)){
				$(this).addClass("grayed");
			}
			n++;
		});
		var percent = Math.floor((currentTime / endTime) * 100);
		$(".progress-bar-inner").css("width", percent + "%");
		$(".progress-bar-inner").css("animation", "none");
		document.title = mode + " - " + timeLeft + " seconds remaining";
	}else{
		if(currentTime >= endTime){
			$(".number-outer-inner").each(function(){
				$(this).removeClass();
				$(this).addClass("number-outer-inner zero");
			});
			$(".progress-bar-inner").css("width", "100%");
			$(".section").addClass("finished");
			document.title = mode + " - " + "Finished";
		}
	}
	currentTime++;
	timeLeft--;
}

function precZero(list, index){
	for(var i=list.length-1;i>=index;i--){
		if(list[i] != "zero"){
			return false;
		}
	}
	return true;
}

function setWork(){
	$(".section").removeClass("finished");
	currentTime = ((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds())) - 28800;
	endTime = 32400;
	timeLeft = endTime - currentTime;
	mode = "Workday";
}

function setSchool(){
	$(".section").removeClass("finished");
	currentTime = ((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds())) - 28500;
	endTime = 24000;
	timeLeft = endTime - currentTime;
	mode = "School";
}

function setCustom(){
	$(".section").removeClass("finished");
	if(/^\d+$/.test($("#seconds-input").val())){
		currentTime = 1;
		endTime = parseInt($("#seconds-input").val()) + 1;
		timeLeft = endTime - currentTime;
		$("#seconds-input").val("");
	}else{
		alert("Invalid Time");
	}
	mode = "Timer";
}

function openSettings(){
	$(".timer").toggleClass("timer-small");
	$(".settings-button").toggleClass("settings-button-expand");
	$(".progress-bar").toggleClass("progress-bar-small");
	$(".settings-pane").toggleClass("settings-pane-visible");
}

$(".tab").click(function(){
	$(".settings").toggleClass("visible");
	$(".tab").toggleClass("tab-on");
});
$(".submit").click(setCustom);
$(".set-work").click(setWork);
$(".set-school").click(setSchool);

$(".settings-button").click(openSettings);

setInterval(renderTime,1000);
setSchool();