var http = require("http");
var fs = require("fs");
var formidable = require("formidable");
var path = require("path");
var fetch = require("node-fetch");

var weatherHost = "https://api.darksky.net";
var weatherPath = "/forecast/6ac07386f336de7ba7deba67ef905ffa/";
var weatherParams = "?exclude=[minutely,daily,alerts,flags,hourly]"

var server = http.createServer(function(req, res) {
	if (req.method.toLowerCase() == "get") {
		respondPage(req, res);
	} else {
		postData(req,res);
	}
});

function respondPage(req, res) {
	var filePath = req.url;
	if (filePath == "/") {
		filePath = "/index.html";
	}
	filePath = __dirname + filePath;
	var extname = path.extname(filePath);
	var contentType = "text/html";
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	fs.exists(filePath, (exists) => {
		if (exists) {
			fs.readFile(filePath, (err, data) => {
				if (err) errorRespond();
				res.writeHead(200, {'Content-Type': contentType});
				res.end(data, 'utf8');
			});
		} else {
			res.writeHead(404);
			res.end();
		}
	});
}

function postData(req, res) {
	let form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		let latitude = fields.latitude;
		let longitude = fields.longitude;

		let reqUrl = weatherHost + weatherPath + latitude + "," + longitude + weatherParams;

		console.info(reqUrl);

		res.writeHead(200, {'Content-Type': 'text/plain'});

		fetch(reqUrl)
			.then(function (fetch_res) {
				return fetch_res.text();
			}).then(function (body){
				console.info(body);
				res.end(body);
			}).catch(err => require('utils').inspect(err));
	});
}

server.listen(3000);
console.info("Server listening at 3000...");