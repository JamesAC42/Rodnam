
function getWeather() {

	navigator.geolocation.getCurrentPosition((position)=>{

		let latitude = position["coords"]["latitude"];
		let longitude = position["coords"]["longitude"];

		let coords = {latitude, longitude};

		$.post("/", coords, (success) => {

			console.log(success);
			return;

		});

	});

}

getWeather();


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

	$("#search-input").keydown(function(e){
		if (e.keyCode === 13) {
			e.preventDefault();
			let query = $(this).val();
			window.location.href = "https://www.google.com/search?q=" + query;
			return;
		}
	});

	$("#school-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/book-blue.png");
	}).mouseleave(function(){
		$(this).children().attr("src","./icons/book-white.png");
	});

	$("#tech-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/terminal-green.png");
	}).mouseleave(function(){
		$(this).children().attr("src","./icons/terminal-white.png");
	});

	$("#misc-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/puzzle-orange.png");
	}).mouseleave(function(){
		$(this).children().attr("src","./icons/puzzle-white.png");
	});

	$("#nip-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/japan-red.png");
	}).mouseleave(function(){
		$(this).children().attr("src","./icons/japan-white.png");
	});

	$("#settings-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/settings-purple.png");
	}).mouseleave(function(){
		$(this).children().attr("src","./icons/settings-white.png");
	});

});