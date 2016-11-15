$(document).ready(function(){
	$(".note-container").slideDown("slow");
	$(".toolbar li a").mouseenter(function(){
		$(this).animate({
			"margin-right":"+=15px",
			"color":"#3C277F"
		})
	}).mouseleave(function(){
		$(this).animate({
			"margin-right":"-=15px",
			"color":"#CBEAF8"
		})
	})
})