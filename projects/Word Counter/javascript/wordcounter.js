var lower = "abcdefghijklmnopqarstuvwxyz";
var numbers = "1234567890 ";
var symbolCheck = lower + numbers;

var colorfulScheme = true;

$(document).ready(function(){
	load_save();
});

function repeatString(r,number){
	var j = "";
	var n = 0;
	while(n < number){
		j += r;
		n++;
	};
	return j;
};

function countW(inputp){
	var amountW = 0;
	var characters = 0;
	
	var input = inputp;
	
	var passage = "";
	
	var n = 0;
	for(n = 0; n < input.length; n++){
		if(!(symbolCheck.indexOf(input[n]) > -1)){
			if(input[n] === "\n"){
				passage += " ";
			}else{
				passage += "";
			};
		}else{
			passage += input[n];
		};
	};
	
	var words = [];
	n = 0;
	var string = "";
	while(n < passage.length){
		if(passage[n] == " "){
			words.push(string);
			string = "";
			amountW++;
			n++;
		}else{
			string += passage[n];
			n++;
		};
	};
	
	var new_words = [];
	
	for(n = 0;n < words.length;n++){
		if(words[n] !== ""){
			new_words.push(words[n]);
		}else{
			amountW -= 1;
		};
	};
	
	var d = new Object;
	for(n = 0; n < new_words.length; n++){
		d[new_words[n]] = 0;
	};
	
	for(n = 0; n < new_words.length; n++){
		d[new_words[n]]++;
	};
	
	var sortplace = [];
	
	for(var w in d){
		sortplace.push([w, d[w]]);
	};
	
	sortplace.sort(function(a, b) {
		return a[1] - b[1]
	});
	
	
	var final = new Object;
	
	for(n = 0; n < sortplace.length; n++){
		final[sortplace[n][0]] = sortplace[n][1];
	};

	var stat = "";
	
	for(var word in final){
		var n = 30 - (word.length + final[word]);
		var f = repeatString("-",n);
		var b = repeatString("0",final[word]);
		var string_amt = final[word].toString();
		stat += word + ": " + f + " " + b + " (" + string_amt + ")" + "<br><br>";
	};
	
	document.getElementById('amt_display').innerHTML = amountW;
	
	document.getElementById('stats').innerHTML = stat;
	
};


function countAll(){
	var input = $("#textbox").val();
	input += " ";
	input = input.toLowerCase();
	countW(input);
}

function countSelected(){
	window.setTimeout(actualCountSelect,500);
}

function actualCountSelect(){
	var selected_input = window.getSelection();
	var passage = selected_input.toString();
	console.log(passage);
	countW(passage);
}

function cleartext(){
	document.getElementById('textbox').value = "";
	countAll();
}

function save(){
	if(typeof(Storage) !== "undefined"){
		var textSave = document.getElementById('textbox').value;
		localStorage.wordCountSave = textSave;
		localStorage.colorScheme = colorfulScheme;
	}else{
		alert("Your browser does not support this save feature.");
	}
};

function load_save(){
	if(typeof(Storage) !== "undefined"){
		if(localStorage.wordCountSave){
			var loadSave = localStorage.wordCountSave;
			document.getElementById('textbox').value = loadSave;
			colorfulScheme = localStorage.colorScheme;
		}else{
			alert('You have no saves!');
		}
	}else{
		alert("Your browser does not support this save feature.");
	}
	countAll();
};

function wipeSave(){
	if(typeof(Storage) !== "undefined"){
		if(localStorage.wordCountSave){
			if(confirm("Are you sure you want to wipe your save?")){
				localStorage.removeItem('wordCountSave');
			}
		}else{
			alert("You have no saves!");
		}
	}else{
		alert("Your browser does not support this save feature.");
	}
};

function colorSchemeToggle(){
	if(colorfulScheme == true){
		$('.jumbotron').css('background-color','#333333')
		$('#title').css('color','white');
		$('#navcontainer').css('background-color','#d6d6c2');
		$('#wcnavbar').css('color','black');
		$('.menubuttons').css('color','black');
		$('#resultbox').css('background-color','#d9d9d9');
		$('#results-head').css('color','black');
		$('#word_display').css('color','black');
		$('#color_toggle').text('Monochrome');
		colorfulScheme = false;
	}else{
		$('.jumbotron').css('background-color','#33ff33')
		$('#title').css('color','#330033');
		$('#navcontainer').css('background-color','#80ffe5');
		$('#wcnavbar').css('color','#000033');
		$('.menubuttons').css('color','#000088');
		$('#resultbox').css('background-color','#b3e6ff');
		$('#results-head').css('color','#330033');
		$('#word_display').css('color','#FF0033');
		$('#color_toggle').text('Colorful');
		colorfulScheme = true;
	}
};




















