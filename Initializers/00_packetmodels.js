const Parser = require('binary-parser').Parser;
const StringOptions = {length: 99, zeroTerminated: true};

module.exports = PacketModels = {

    header: new Parser().skip(1)
        .string("command", StringOptions),

    login: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .string("password", StringOptions), //TODO: encrypted passwords

    register: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .string("password", StringOptions), //TODO: encrypted passwords

    pos: new Parser().skip(1)
        .string("command", StringOptions)
        .int32le("target_x", StringOptions)
        .int32le("target_y", StringOptions),

    exit: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
}