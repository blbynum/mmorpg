// Import required libraries
require(__dirname + '/Resources/config.js');
const fs = require('fs');
const net = require('net');

// Load the initializers
const init_files = fs.readdirSync(__dirname + "/Initializers");
init_files.forEach(function (initFile) {
    console.log('Loading Initializer: + ' + initFile);
})

// 1. Load the Initializers
// 2. Load data models
// 3. Load game map data
// 4. Initiate the server and listen to the internet
            // all of server logic