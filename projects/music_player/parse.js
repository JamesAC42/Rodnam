const fs = require("fs");
const load = require("audio-loader");
const audioMetaData = require("audio-metadata");

function song(path, metadata) {
    this.path = path;
    this.metadata = metadata;
}

let contentMap = {};

const parse = (dir, results) => {
    fs.readdir(dir, (err, files) => {
        if(err || !files.length) return;
        for(let file in files) {
            
        }
    })
}