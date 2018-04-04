const { spawn } = require('child_process');
const fs = require('fs');

const srcPath = './videos/';
const destPath = './music/';

fs.readdir(srcPath, (err, files) => {
    files.forEach(file => {
        console.info(file);
        //ffmpeg -i sample.avi -q:a 0 -map a sample.mp3
        let extract = spawn('ffmpeg', ['-i', srcPath + file, '-q:a', '0', '-map', 'a', destPath + file.split('.')[0] + '.mp3']);
        extract.stdout.on('data', (data) => {
            console.info(data.toString());
        });
        extract.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
        extract.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
});