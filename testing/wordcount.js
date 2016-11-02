var lower = "abcdefghijklmnopqarstuvwxyz";
var numbers = "1234567890 ";
var symbolCheck = lower + numbers;

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
	passage += " ";
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
	$("#counter-tab").text(amountW);
	
	
};


function countAll(){
	var input = $("#text_area").val();
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