const zeroBuffer = new Buffer('00', 'hex');

module.exports = packet = {

    // params: an array of javascript objects to be turned into buffers
    build: function (params) {
        let packetParts = [];
        let packetSize = 0;

        params.forEach(function (param) {
            let buffer;

            if (typeof param === 'string') {
                buffer = new Buffer(param, 'utf8');
                buffer = Buffer.concat([buffer, zeroBuffer], buffer.length + 1);
            } else if (typeof param === 'number') {
                buffer = new Buffer(2);
                buffer.writeUInt16LE(param, 0);
            } else {
                console.log("WARN: Unkown data type in packet builder!");
            }

            packetSize += buffer.length;
            packetParts.push(buffer);
        })

        let dataBuffer = Buffer.concat(packetParts, packetSize);

        let size = new Buffer(1);
        size.writeUInt8(dataBuffer.length + 1, 0);

        let finalPacket = Buffer.concat([size, dataBuffer], size.length + dataBuffer.length);

        return finalPacket;
    },

    // Parse a packet to be handled for a client
    parse: function (client, data) {

        // index
        let i = 0;

        while ( i < data.length ) {

            let packetSize = data.readUInt8(i);
            let extractedPacket = new Buffer(packetSize);
            data.copy(extractedPacket, 0, i, i + packetSize);

            this.interpret(client, extractedPacket);

            i += packetSize;

        }

    },

    interpret(client, dataPacket) {
        let header = PacketModels.header.parse(dataPacket);
        console.log("Interpret: " + header.command);

        switch (header.command.toUpperCase()) {
            case "LOGIN":
                let data = PacketModels.login.parse(dataPacket);
                User.login(data.username, data.password, function(result, user) {
                    if(result) {
                        client.user = user;
                        client.enterroom(client.user.current_room);
                        client.socket.write(packet.build(["LOGIN", "TRUE", client.user.current_room, client.user.pos_x, client.user.pos_y, client.user.username]))
                    } else {
                        client.socket.write(packet.build(["LOGIN", "FALSE"]));
                    }
                })
                break;
            case "REGISTER":
                // TODO: something
                break;
        }

    }
}