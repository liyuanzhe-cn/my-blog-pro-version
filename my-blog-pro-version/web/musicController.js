const fs = require('fs');
const { writeResult, JSONtoString } = require('../util/responseUtil');
const mypath = require('path')
const path = new Map();

function queryMusic(request, response) {
    console.log(request.query)
    fs.readFile(__dirname + "/../music/" + request.query.music, (err, data) => {
        if (data) {
            response.setHeader("Content-Type", "audio/mpeg")
            response.writeHead(200);
            response.write(data);
            response.end();
        }
    })
}

path.set('/queryMusic', queryMusic);

module.exports.path = path;