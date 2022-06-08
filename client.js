const now = require('performance-now');
const _ = require('underscore');

module.exports = function () {

    const client = this;

    // These objects will be added at runtime
    // this.socket = {}
    // this.user = {}

    // Init
    this.initiate = function () {
        // Send the connection handshake packet to the client
        client.socket.write(packet.build(["HELLO", now().toString()]));

        console.log('client initiated');
    }

    // Client Methods
    this.enterroom = function(selected_room) {

        maps[selected_room].clients.forEach(function(otherClient) {
            otherClient.socket.write(packet.build(["ENTER", client.user.username, client.user.pos_x, client.user.pos_y]))
        });

        maps[selected_room].clients.push(client);

    };

    this.broadcastroom = function(packetData) {
        maps[client.user.current_room].clients.forEach(function(otherClient) {
            if (otherClient.user.username != client.user.username) {
                otherClient.socket.write(packetData);
            }
        });
    };

    // Socket Stuff
    this.data = function (data) {
        packet.parse(client, data);
    };

    this.error = function (err) {
        console.log("client error " + err.toString());
    };

    this.end = function () {
        console.log("client disconnected")
        client.broadcastroom(packet.build(["LEAVE", client.user.username]));
    };

}
