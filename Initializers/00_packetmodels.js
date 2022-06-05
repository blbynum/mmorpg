const parser = require('binary-parser').Parser;
const StringOptions = {length: 99, zeroTerminated: true};

module.exports = PacketModels = {

    header: new Parser().skip(1)
        .string("command", StringOptions),

    logimn: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .string("password", StringOptions) //TODO: encrypted passwords

}