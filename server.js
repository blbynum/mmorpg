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

console.log(maps);

// 1. Load the Initializers
// 2. Load data models
// 3. Load game map data
// 4. Initiate the server and listen to the internet
            // all of server logic