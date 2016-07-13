$(document).ready(function(){
	function animateButton(){
		$('#front').animate({
			width: '+=2%'
		}).animate({
			width: '-=2%'
		})
		animateButton()
	}
	animateButton();
});

$(document).ready(function(){
	$('#resultbox, #explanation').hide()
});