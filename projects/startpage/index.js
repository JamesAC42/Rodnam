var http = require("http").createServer(handler);
var fs = require("fs");
var path = require("path");

http.listen(3000);

function handler(req, res) {
	if (req.method.toLowerCase() == "get") {
		respondPage(req, res);
	} else {
		postData(req,res);
	}
}

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
	console.log("received");
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write("{'hello':'world'}");
	res.end();
}