
/* Learnyounode Challenge 2
input = process.argv;
input.splice(0,2);
sum = 0;
for(var i = 0; i < input.length;i++){
	number = parseInt(input[i]);
	sum += number;
}
console.log(sum);
*/

/* Learnyounode challenge 3
var fs = require('fs');
var string = fs.readFileSync(process.argv[2]).toString();
var char = string.split("");
var amt = 0;
for(var i = 0; i < char.length; i++){
	if(char[i] == "\n"){
		amt++;
	};
};
console.log(amt);
*/

