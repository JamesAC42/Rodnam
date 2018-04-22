const fs = require("fs");
const path = require("path");
const load = require("audio-loader");
const AudioMetaData = require("audio-metadata");

var walk = function(dir, done) {
    var results = {};
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        for(let parent in res) {
                            if(!results[parent]) {
                                results[parent]= [];
                            }
                            results[parent].push(res[parent]);
                        }
                        if (!--pending) done(null, results);
                    });
                } else {
                    let parent = path.dirname(file).split(path.sep).pop()
                    if(!results[parent]) {
                        results[parent]= [];
                    }
                    results[parent].push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

walk("music/", (err, songs) => {
    console.info(songs);
    if (err) throw err;
    let dataMap = require("./music_saves.json");
    dataMap.songs = songs;
    fs.writeFile("music_saves.json", JSON.stringify(dataMap, null, '  '), "utf8", callback=>{return});
});
