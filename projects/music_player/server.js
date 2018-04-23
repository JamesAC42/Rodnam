
const fs = require("fs");
const path = require("path");
const url = require("url");
const formidable = require("formidable");

const handler = (req, res) => {
    if(req.method.toLowerCase() === 'get') {
        displayPage(req, res);
    } else if(req.method.toLowerCase() === 'post') {
        let dest = req.url;
        switch(dest) {
            case '/getSongs':
                getSongs(req, res);
            default:
                res_error(res, 500);
        }
    }
}

const server = require('http').createServer(handler);

const fileTypes = {
    '.html':'text/html',
    '.js':'text/javascript',
    '.css':'text/css',
    '.flac':'audio/flac',
    '.mp3':'audio/mpeg',
    '.jpg':'image/jpg',
    '.png':'image/png',
    '.ico':'image/x-icon',
    '.ttf':'application/octet-stream'
}

const displayPage = (req, res) => {
    let filePath = req.url;
    if(filePath === '/') filePath = 'index.html';
    filePath = __dirname+"/"+filePath;
    let extname = path.extname(filePath);
    let contentType;
    if(fileTypes[extname] !== undefined) {
        contentType = fileTypes[extname];
    } else {
        console.info("Invalid filetype: " + extname);
        res_error(res, 500);
    } 
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, (error, content) => {
                if (error) {
                    res_error(res, 500);
                } else {                   
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');                  
                }
            });
        } else {
            res_error(res, 404);
        }
    });
}

const getSongs = (req, res) => {
    let dataMap = require("./music_saves.json");
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.end(JSON.stringify(dataMap));
}

const res_error = (res, e) => {
    res.writeHead(e);
    res.end();
}

server.listen(4567);
console.log("Listening at 4567...");
