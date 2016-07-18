$(document).ready(function(){
	$(".changeenter").mouseenter(function(){
		$(this).children('img').animate({
			width: "+=5%"
		});
    }).mouseleave(function(){
		$(this).children('img').animate({
			width: "-=5%"
		});
	});
});

