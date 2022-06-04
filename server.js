// Import required libraries
require(__dirname + "/Resources/config.js").config;
const fs = require('fs');
const net = require('net');

// Load Initializers
const init_files = fs.readdirSync(__dirname + "/Initializers");
init_files.forEach(function (initFile) {
    console.log('Loading Initializers: + ' + initFile);
    require(__dirname + "/Initializers/" + initFile);
})

// Load Models
const model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function (modelFile) {
    console.log('Loading Model: + ' + modelFile);
    require(__dirname + "/Models/" + modelFile);
})

// Load Map Data
maps = {};

const map_files = fs.readdirSync(config.data_paths.maps);
map_files.forEach(function (mapFile) {
    console.log('Loading Map: ' + mapFile);
    let map = require(config.data_paths.maps + "/" + mapFile);
    maps[map.room] = map;
})

net.createServer(function(socket) {

    console.log("socket connected")

    socket.on('error', function (err) {
        console.log("socket error " + err.toString());
    });

    socket.on('end', function () {
        console.log("socket closed")
    });

    socket.on('data', function (data) {
        console.log("socket data " + data.toString())
    });

}).listen(config.port);

console.log("Initialization Completed, Server running on port: " + config.port + " for environment: " + config.environment);


// 4. Initiate the server and listen to the internet
            // all of server logic