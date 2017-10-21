var date = new Date();
var currentTime = 0;
var endTime = 0;
var timeLeft = 0;
var mode;
var customtimes = [0,0,0];

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

var savedTimes = {
	"school" : [28500, 24000],
	"work" : [28800, 32400]
}

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

function setElapsed(endpoints, name){
	$(".section").removeClass("finished");
	currentTime = ((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds())) - endpoints[0];
	endTime = endpoints[1];
	timeLeft = endTime - currentTime;
	mode = name;
}

function setCustom(){
	$(".section").removeClass("finished");
	currentTime = 1;
	endTime = (customtimes[0] * 60 * 60) + (customtimes[1] * 60) + (customtimes[2]) + 1;
	timeLeft = endTime - currentTime;
	$(".hour-scroll-inner, .minute-scroll-inner, .second-scroll-inner").scrollTop(0);
	customtimes = [0,0,0];
	openSettings();
	mode = "Timer";
}

function openSettings(){
	$(".timer").toggleClass("timer-small");
	$(".settings-button").toggleClass("settings-button-expand");
	$(".progress-bar").toggleClass("progress-bar-small");
	$(".settings-pane").toggleClass("settings-pane-visible");
}

$.fn.scrollStopped = function(callback) {
	var that = this, $this = $(that);
	$this.scroll(function(ev) {
		clearTimeout($this.data('scrollTimeout'));
		$this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
	});
};

function setScroll(pos, i, e){
	let offset = pos % 100;
	let newPos = pos - offset;
	if (offset >= 50) {
		newPos = pos += (100 - offset);
	}
	e.scrollTop(newPos);
	customtimes[i] = newPos / 100;
}

$(".hour-scroll-inner").scrollStopped(function(ev){
	let scrollPos = $(this).scrollTop();
	setScroll(scrollPos, 0, $(this));
});

$(".minute-scroll-inner").scrollStopped(function(ev){
	let scrollPos = $(this).scrollTop();
	setScroll(scrollPos, 1, $(this))
});

$(".second-scroll-inner").scrollStopped(function(ev){
	let scrollPos = $(this).scrollTop();
	setScroll(scrollPos, 2, $(this))
});

$(".set-work").click(setElapsed(savedTimes.work, "Work"));
$(".set-school").click(setElapsed(savedTimes.school, "School"));
$(".set-time").click(setCustom);
$(".settings-button").click(openSettings);

setInterval(renderTime,1000);