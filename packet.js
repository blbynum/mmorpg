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
    parse: function (c, data) {

        // index
        let idx = 0;

        while ( idx < data.length ) {

            let packetSize = data.readUInt8(idx);
            let extractedPacket = new Buffer(packetSize);
            data.copy(extractedPacket, 0, idx, idx + packetSize);

            this.interpret(c, extractedPacket);

            idx += packetSize;

        }

    },

    interpret(c, dataPacket) {
        let header = PacketModels.header.parse(dataPacket);
        console.log("Interpret: " + header.command);

        let data;
        let command = header.command.toUpperCase();

        switch (command) {
            case "LOGIN":
                data = PacketModels.login.parse(dataPacket);
                User.login(data.username, data.password, function(result, user) {
                    console.log("Login Result " + result);
                    if(result) {
                        c.user = user;
                        c.enterroom(c.user.current_room);
                        c.socket.write(packet.build(["LOGIN", "TRUE", c.user.current_room, c.user.pos_x, c.user.pos_y, c.user.username, c.user.hp_max, c.user.hp]))
                    } else {
                        c.socket.write(packet.build(["LOGIN", "FALSE"]));
                    }
                });
                break;
            case "REGISTER":
                data = PacketModels.register.parse(dataPacket);
                User.register(data.username, data.password, function(result, user) {
                    if(result) {
                        c.socket.write(packet.build(["REGISTER", "TRUE"]));
                    } else {
                        c.socket.write(packet.build(["REGISTER", "FALSE"]));
                    }
                });
                break;
            case "POS":
                data = PacketModels.pos.parse(dataPacket);
                console.log(data);

                c.user.pos_x = data.target_x;
                c.user.pos_y = data.target_y;
                c.user.save(); // TODO: Save less often
                c.broadcastroom(packet.build(["POS", c.user.username, data.target_x, data.target_y]));

                break;

            case "STATS":
                data = PacketModels.stats.parse(dataPacket);
                console.log(data);

                c.user.hp_max = data.hp_max;
                c.user.hp = data.hp;
                c.user.save();
                c.broadcastroom(packet.build(["STATS", c.user.username, data.hp_max, data.hp]));

                break;
            case "EXIT":
                data = PacketModels.exit.parse(dataPacket);
                console.log(data);

                c.user.username = data.username;
                c.exitroom();

                break;
            default:
                console.log("Unrecognized packet type " + command);
        }

    }
}