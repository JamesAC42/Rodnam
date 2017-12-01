
var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January", "February","March","April","May","June","July","August","September","October","November","December"];

function getWeather() {

	navigator.geolocation.getCurrentPosition((position)=>{

		let latitude = position["coords"]["latitude"];
		let longitude = position["coords"]["longitude"];

		let coords = {latitude, longitude};

		$.post("/", coords, (forecastData) => {
			
			dataObject = JSON.parse(forecastData);
			loadWeather(dataObject);

		});

	});

}

getWeather();

var linkData = {
	"school":{
		"name":"school",
		"img-name":"book",
		"img-color":"blue",
		"color":"#1A85D0",
		"links":[],
		"active":true
	},
	"tech":{
		"name":"tech",
		"img-name":"terminal",
		"img-color":"green",
		"color":"#27BF3C",
		"links":[
		],
		"active":false
	},
	"misc":{
		"name":"misc",
		"img-name":"puzzle",
		"img-color":"orange",
		"color":"#EE7204",
		"links":[],
		"active":false
	},
	"nip":{
		"name":"nip",
		"img-name":"japan",
		"img-color":"red",
		"color":"#F53737",
		"links":[],
		"active":false
	},
	"settings":{
		"name":"settings",
		"img-name":"settings",
		"img-color":"purple",
		"color":"#764CFD",
		"links":[],
		"active":false
	}
}

var weatherIcons = {
	"clear-day":"sunny-white.png",
	"clear-night":"night.png",
	"rain":"rain.png", 
	"snow":"snow.png", 
	"sleet":"hail.png", 
	"wind":"wind.png", 
	"fog":"fog.png", 
	"cloudy":"cloudy.png", 
	"partly-cloudy-day":"partlycloudy.png",
	"partly-cloudy-night":"partlycloudynight.png"
}

function loadLinks(cat) {
	$("div.title-bar").css("background",linkData[cat]["color"]);
	for (let item in linkData) {
		let entry = linkData[item];
		if(entry["active"]) {
			$("#" + entry["name"] + "-tab").children().attr("src","./icons/" + entry["img-name"] + "-white.png");
			entry["active"] = false;
		}
	}
	$("#" + linkData[cat]["name"] + "-tab").children().attr("src","./icons/" + linkData[cat]["img-name"] + "-" + linkData[cat]["img-color"] + ".png");
	linkData[cat]["active"] = true;
	$("#links-list-1, #links-list-2").empty();
	let links = linkData[cat]["links"];
	for (let i = 0; i < links.length; i++) {
		let $listItem = $("<li><a href='" + links[i]["url"] + "'>" + links[i]["title"] + "</a></li>");
		if(i%2==1) {
			$("#links-list-1").append($listItem);
		} else {
			$("#links-list-2").append($listItem);
		}
	}
}

function loadWeather(data) {

	let currently = data.currently;
	let time = currently["time"];
	let summary = currently["summary"];
	let icon = currently["icon"];
	let precipProbability = currently["precipProbability"];
	let temperature = Math.round(currently["temperature"]);
	let windSpeed = Math.round(currently["windSpeed"]);
	let humidity = currently["humidity"];
	let location = data.timezone;
	let date = new Date(time * 1000);

	let hours = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10)
		minutes = "0" + minutes.toString();

	$(".time-stamp").text(hours + ":" + minutes);
	$(".weekday").text(weekdays[date.getDay()]);
	$(".month-num").text(months[date.getMonth()] + " " + date.getDate());
	$(".year").text(date.getFullYear());

	$("#weather-location").text(location);
	$(".temp-sum").text(temperature + "\u00B0");
	$("#precipitation-val").text(precipProbability * 100 + "%");
	$("#humidity-val").text(humidity * 100 + "%");
	$("#windspeed-val").text(windSpeed + " MPH");

	$("#current-weather-img").attr("src","./icons/weather/" + weatherIcons[icon]);

	$(".weather-description").text(summary);

	let hourly = data.hourly;
	let forecastSummary = hourly.summary;
	let forecastHours = hourly.data;

	$(".forecast-description").text(forecastSummary);

	var forecastItems = $(".forecast").children();

	$(".forecast-item").each(function(i){

		let dataItem = forecastHours[i];
		let time  = dataItem["time"];
		let icon = dataItem["icon"];
		let precipProbability = dataItem["precipProbability"];
		let temperature = Math.round(dataItem["temperature"]);
		let date = new Date(time * 1000);

		let hours = date.getHours();
		let minutes = date.getMinutes();
		if(minutes < 10) minutes = "0" + minutes.toString();

		let $forecastItem = forecastItems[i];

		$(this).children(".forecast-time").text(hours + ":" + minutes);
		$(this).children(".forecast-symbol").children().attr("src","./icons/weather/" + weatherIcons[icon]);
		$(this).children(".forecast-temp").text(temperature + "\u00B0");
		$(this).children(".forecast-precip").children(".forecast-precip-val").text(precipProbability * 100 + "%");

	});

}


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

			let sections = query.split(" ");
			
			switch(sections[0]){
				case "search":
					window.location.href = "https://www.google.com/search?q=" + query;
				case "add-item":
					let cat = sections[1];
					let title = sections[2];
					let url = sections[3];

					let entry = {title, url};

					linkData[cat]["links"].push(entry);

					if (linkData[cat]["active"]) {
						let $listItem = $("<li><a href='" + url + "'>" + title + "</a></li>");
						if (linkData[cat]["links"].length % 2 == 0){
							$("#links-list-1").append($listItem);
						} else {
							$("#links-list-2").append($listItem);
						}
					};
					$(this).val("");
					console.log(linkData);
					return;
			}
			
		}
	});

	$("#school-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/book-blue.png");
	}).mouseleave(function(){
		if(!linkData["school"]["active"]) {
			$(this).children().attr("src","./icons/book-white.png");
		}
	}).click(function(){
		loadLinks("school");
	});

	$("#tech-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/terminal-green.png");
	}).mouseleave(function(){
		if(!linkData["tech"]["active"]) {
			$(this).children().attr("src","./icons/terminal-white.png");
		}
	}).click(function(){
		loadLinks("tech");
	})

	$("#misc-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/puzzle-orange.png");
	}).mouseleave(function(){
		if(!linkData["misc"]["active"]) {
			$(this).children().attr("src","./icons/puzzle-white.png");
		}
	}).click(function(){
		loadLinks("misc");
	})

	$("#nip-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/japan-red.png");
	}).mouseleave(function(){
		if(!linkData["nip"]["active"]) {
			$(this).children().attr("src","./icons/japan-white.png");
		}
	}).click(function(){
		loadLinks("nip");
	})

	$("#settings-tab").mouseenter(function(){
		$(this).children().attr("src","./icons/settings-purple.png");
	}).mouseleave(function(){
		if(!linkData["settings"]["active"]) {
			$(this).children().attr("src","./icons/settings-white.png");
		}
	}).click(function(){
		loadLinks("settings");
	})


});

