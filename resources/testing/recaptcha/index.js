var http = require("http");
var formidable = require("formidable");

var server = http.createServer(function(req, res) {
	if (req.method.toLowerCase() === 'get') {
		displayPage(req, res);
	} else if (req.method.toLowerCase() === 'post') {
		processForm(req, res);
	}
});

function displayPage(req, res) {

}

function processForm(req, res) {

}