
var weatherurl = "https://api.darksky.net/forecast/6ac07386f336de7ba7deba67ef905ffa/39.952584,-75.165222?exclude=[minutely,daily,alerts,flags,hourly]";

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

});