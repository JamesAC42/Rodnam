$(document).ready(function(){

	$(".icon").mouseover(function(){
		$(this).prev().addClass("icon-support");
		$(this).next().addClass("icon-support");
	}).mouseleave(function(){
		$(this).prev().removeClass("icon-support");
		$(this).next().removeClass("icon-support");
	});

	$(".icons-container").mouseover(function(){
		$(".navbar-glow").addClass("navbar-glow-highlight");
	}).mouseleave(function(){
		$(".navbar-glow").removeClass("navbar-glow-highlight");
	});

});