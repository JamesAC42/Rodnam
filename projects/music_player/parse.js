const fs = require("fs");
const path = require("path");

const mm = require("music-metadata");
const util = require("util");

let walk = (dir, done) => {
    let results = {
        "songs":{},
        "albums":{},
        "artists":{},
        "playlists":{},
        "genres":{},
        "all":{}
    };
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    /*let dirName = file.split(path.sep).pop();
                    let newDir = dirName.replace(/\s+/g,'+');
                    newDir = newDir.replace(/[^a-zA-Z0-9\-.]/g,'+');
                    //newname = newname.replace('-mkv', '.mkv');
                    fs.rename(file, dir + "/" + newDir, function(err){
                        if(err) throw err;
                    });
                    */
                    walk(file, (err, res) => {
                        for(let cat in res) {
                            if(cat !== "all") {
                                for(let index in res[cat]) {
                                    if(results[cat][index] === undefined)
                                        results[cat][index] = [];
                                    results[cat][index] = results[cat][index].concat(res[cat][index]);
                                }
                            } else {
                                for(let song in res[cat]) {
                                    results[cat][song] = res[cat][song];
                                }
                            }
                        }
                        if (!--pending) done(null, results);
                    });
                } else {
                    let parent = path.dirname(file).split(path.sep).pop()
                    let ext = path.extname(file);
                    if(ext === ".mp3" || ext === ".flac") {
                        mm.parseFile(file, {native: true})
                            .then(function (metadata) {

                                let tags = metadata.common;
                                let entry = {};
                                
                                let fileName = path.basename(
                                    file, path.extname(file));
                                    
                                if(tags.title === undefined) {
                                    entry.title = fileName;
                                } else {
                                    entry.title = tags.title;
                                }

                                let newname = fileName.replace(/\s+/g,'-');
                                newname = fileName.replace(/[^a-zA-Z0-9\-.]/g,'-') + ext;
                                //newname = newname.replace('-mkv', '.mkv');
                                fs.rename(file, dir + "/" + newname, function(err){
                                    if(err) throw err;
                                });

                                entry.path = path.relative(process.cwd(), dir + "/" + newname);
                                    
                                entry.artist = (tags.artist === undefined) ? 
                                    "None" : tags.artist;
                                entry.album = (tags.album === undefined) ? 
                                    "None" : tags.album;
                                entry.genre = (tags.genre === undefined) ?
                                    [] : tags.genre;

                                let id = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
                                results["all"][id] = entry;

                                if(results["songs"][parent] === undefined)
                                    results["songs"][parent] = [];
                                if(results["artists"][entry.artist] === undefined)
                                    results["artists"][entry.artist] = [];
                                if(results["albums"][entry.album] === undefined)
                                    results["albums"][entry.album] = [];

                                results["songs"][parent].push(id);
                                results["artists"][entry.artist].push(id);
                                results["albums"][entry.album].push(id);
                                
                                for(let genre in entry.genre) {
                                    if(results["genres"][entry.genre[genre]]
                                        === undefined)
                                        results["genres"][entry.genre[genre]] = [];
                                    results["genres"][entry.genre[genre]]
                                        .push(id);
                                }

                                if (!--pending) done(null, results);
                            })
                            .catch(function (err) {
                                console.error(err);
                            });
                    } else {
                        if (!--pending) done(null, results);
                    }
                }
            });
        });
    });
}

walk("music/", (err, result) => {
    if(err) throw err;
    fs.writeFile("music_saves.json", JSON.stringify(result, null, '  '), "utf8", callback=>{return});
});
