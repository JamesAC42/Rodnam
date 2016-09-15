var exVisible = false

function working(){
	if(!exVisible){
		$('#explanation').delay(2000).slideDown();
		exVisible = true;
	}
	var v = Math.random();
	state = (v < .5) ? 'YES' : 'NO';
	$('#resultbox').slideUp().delay(600).text(state).slideDown();
}