// Import required libraries
const args = require('minimist')(process.argv.slice(2));
const extend = require('extend');

// Store the environment variable
const environment = args.env || "test";

// Common config... ie: name, version, max player, etc...
const common_conf = {
    name: "hangryassassins mmo game server",
    version: "0.0.1",
    environment: environment,
    max_player: 100,
    data_paths: {
        items: __dirname + "/Game Data/" + "Items",
        maps: __dirname + "/Game Data/" + "Maps"
    },
    starting_zone: "rm_map_home"
};

// Environment-specific Configuration
const conf = {
    production: {
        ip: args.ip || "0.0.0.0",
        port: args.port || "8082",
        database: "mongodb://127.0.0.1:27017/HangryAssMMO_prod"
    },
    test: {
        ip: args.ip || "0.0.0.0",
        port: args.port || "8082",
        database: "mongodb://127.0.0.1:27017/HangryAssMMO_test"
    }
};

extend(false, conf.production, common_conf);
extend(false, conf.test, common_conf);

module.exports = config = conf[environment];
