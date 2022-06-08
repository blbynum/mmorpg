// Import required libraries
require(__dirname + "/Resources/config.js");
const fs = require('fs');
const net = require('net');
require('./packet.js');


console.log('\n' +
    '██╗░░██╗░█████╗░███╗░░██╗░██████╗░██████╗░██╗░░░██╗░█████╗░░██████╗░██████╗\n' +
    '██║░░██║██╔══██╗████╗░██║██╔════╝░██╔══██╗╚██╗░██╔╝██╔══██╗██╔════╝██╔════╝\n' +
    '███████║███████║██╔██╗██║██║░░██╗░██████╔╝░╚████╔╝░███████║╚█████╗░╚█████╗░\n' +
    '██╔══██║██╔══██║██║╚████║██║░░╚██╗██╔══██╗░░╚██╔╝░░██╔══██║░╚═══██╗░╚═══██╗\n' +
    '██║░░██║██║░░██║██║░╚███║╚██████╔╝██║░░██║░░░██║░░░██║░░██║██████╔╝██████╔╝\n' +
    '╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝╚═════╝░╚═════╝░\n' +
    '\n' +
    '███╗░░░███╗███╗░░░███╗░█████╗░  ░██████╗███████╗██████╗░██╗░░░██╗███████╗██████╗░\n' +
    '████╗░████║████╗░████║██╔══██╗  ██╔════╝██╔════╝██╔══██╗██║░░░██║██╔════╝██╔══██╗\n' +
    '██╔████╔██║██╔████╔██║██║░░██║  ╚█████╗░█████╗░░██████╔╝╚██╗░██╔╝█████╗░░██████╔╝\n' +
    '██║╚██╔╝██║██║╚██╔╝██║██║░░██║  ░╚═══██╗██╔══╝░░██╔══██╗░╚████╔╝░██╔══╝░░██╔══██╗\n' +
    '██║░╚═╝░██║██║░╚═╝░██║╚█████╔╝  ██████╔╝███████╗██║░░██║░░╚██╔╝░░███████╗██║░░██║\n' +
    '╚═╝░░░░░╚═╝╚═╝░░░░░╚═╝░╚════╝░  ╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝');
console.log('Node version: ' + process.version + '\n\n');

console.log('Loading Initializers...');
const init_files = fs.readdirSync(__dirname + "/Initializers");
init_files.forEach(function (initFile) {
    console.log('Loading Initializers: + ' + initFile);
    require(__dirname + "/Initializers/" + initFile);
})

console.log('Loading Models...');
const model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function (modelFile) {
    console.log('Loading Model: + ' + modelFile);
    require(__dirname + "/Models/" + modelFile);
})

console.log('Loading Maps...');
maps = {};
const map_files = fs.readdirSync(config.data_paths.maps);
map_files.forEach(function (mapFile) {
    console.log('Loading Map: ' + mapFile);
    let map = require(config.data_paths.maps + "/" + mapFile);
    maps[map.room] = map;
})

net.createServer(function (socket) {

    console.log("socket connected")
    const c_inst = new require('./client.js');
    let thisClient = new c_inst();

    thisClient.socket = socket;
    thisClient.initiate();

    socket.on('error', thisClient.error);

    socket.on('end', thisClient.end);

    socket.on('data', thisClient.data);

}).listen(config.port);

console.log("Initialization Completed, Server running on port: " + config.port + " for environment: " + config.environment);


// 4. Initiate the server and listen to the internet
// all of server logic