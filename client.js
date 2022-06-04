const now = require('performance-now');
const _ = require('underscore');

module.exports = function() {

    // These objects will be added at runtime
    // this.socket = {}
    // this.user = {}

    this.initiate = function() {
        // do some stuff
    }

    this.data = function (data) {
        console.log("client data " + data.toString());
    }

    this.error = function(err) {
        console.log("client error " + err.toString());
    }

    this.end = function () {
        console.log("client closed");
    }

}
