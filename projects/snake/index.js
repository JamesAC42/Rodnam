var http = require("http");
var formidable = require("formidable");
var mysql = require("mysql");
var url = require("url");
var fs = require("fs");
var path = require("path");

var server = http.createServer((req, res) => {
	if (req.method.toLowerCase() === "get") {
		displayPage(req, res);
	} else {
		postResponse(req, res);
	}
});

function displayPage (req, res) {
	var filePath = req.url;
	if (filePath == '/') {
		filePath = '/index.html';
	}
	let oldPath = url.parse(filePath, true);
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
	if (oldPath.pathname == '/snake'){
		fs.readFile("./snake/snake.html", (err, data) => {
			if (err) errorRespond(res);
			res.writeHead(200, {'Content-Type': 'text/html'}); 
			res.end(data, 'utf8');
		});
	} else if (oldPath.pathname == '/stop'){
		fs.readFile("./stop/stop.html", (err, data) => {
			if (err) errorRespond(res);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data, 'utf8');
		});
	} else {
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
}

function postResponse(req, res) {
	if (req.url == "/snake/getHighScores") {
		snake_getHighScores(req, res);
	} else if (req.url == "/snake/submitScore") {
		snake_submitScore(req, res);
	}
}

function snake_getHighScores(req, res) {
	var sql_con = sqlConnect("snake");
	sql_con.connect((err) => {
		if (err) errorRespond(res);
	});
	var query = "SELECT name, score FROM scores";
	sql_con.query(query, (err, result, fields) => {
		if (err) errorRespond(res);
		var scores = result;
		scores.sort((a, b) => {
			return b.score - a.score;
		});
		if (scores.length >= 10) {
			scores = scores.slice(0,10);
		} else {	
			while (scores.length < 10) {
				scores.push({
					"name": "___",
					"score": 0
				});
			}
		}
		sql_con.end();
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write(JSON.stringify(scores));
		res.end();
	});
}

function snake_submitScore(req, res) {
	var sql_con = sqlConnect("snake");
	sql_con.connect((err) => {
		if (err) errorRespond(res);
	});
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) errorRespond(res);
		res.writeHead(200, {'Content-Type':'text/plain'});
		var userName = fields.name;
		var score = fields.score;
		if(typeof userName == "string" && !isNaN(score)){
			if(userName.length != 3 || score > 2000){
				sql_con.end();
				res.write("rodnam.nfshost.com/stop");
				res.end();
			}
			var datetime = new Date().toISOString().slice(0,19).replace('T', ' ');
			var query = "INSERT INTO scores (name, score, date) values (" 
						+ "'" + userName + "'," 
						+ score + ","
						+ "'" + datetime + "')";
			sql_con.query(query, (err, result) => {
				if (err) errorRespond();
				sql_con.end();
				snake_getHighScores(req, res);
			});
		} else {
			sql_con.end();
			res.write("rodnam.nfshost.com/stop");
			res.end();
		}
	});
}

function sqlConnect(db) {
	let sql_con = mysql.createConnection({
		"host": "rodnam.db",
		"user": "jcrovo",
		"password": "",
		"database": db
	});
	return sql_con;
}

function errorRespond(res){
	res.writeHead(500);
	res.end();
}

server.listen(8080);
