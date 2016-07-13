$(document).ready(function(){
	$(".grow").mouseenter(function(){
		$(this).animate({
			width: "+=3%"
		});
    }).mouseleave(function(){
		$(this).animate({
			width: "-=3%"
		})
	});
});
