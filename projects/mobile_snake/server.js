var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var server = http.createServer(function(req, res){
	if(req.method.toLowerCase() == 'get'){
	 	respondPage(req,res);
	}
});

function respondPage(req, res){
	var filePath = req.url;
	if (filePath == '/') {
		filePath = '/snake.html';
	}
	let oldPath = url.parse(filePath,true);
	filePath = __dirname+filePath;
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
		contentType = 'text/javascript';
		break;
		case '.css':
		contentType = 'text/css';
		break;
	}
	fs.exists(filePath, function(exists) {
		if (exists) {
		  fs.readFile(filePath, function(error, content) {
		      if (error) {
		          res.writeHead(500);
		          res.end();
		      }
		      else {                   
		          res.writeHead(200, { 'Content-Type': contentType });
		          res.end(content, 'utf8');                  
		      }
		  });
		}
	});
}

server.listen(8000);