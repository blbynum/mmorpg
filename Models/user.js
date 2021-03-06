const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,

    sprite: String,

    current_room: String,
    pos_x: Number,
    pos_y: Number,

    hp_max: Number,
    hp: Number
});

userSchema.statics.register = function(username, password, cb) {


    let new_user = new User({
        username: username,
        password: password,

        sprite: "spr_Hero",

        current_room: maps[config.starting_zone].room,
        pos_x: maps[config.starting_zone].start_x,
        pos_y: maps[config.starting_zone].start_y,

        hp_max: 100,
        hp: 100
    });

    new_user.save(function (err) {
        if (!err) {
            cb(true);
        } else {
            cb(false);
        }
    });

};

userSchema.statics.login = function(username, password, cb) {
    User.findOne({username: username}, function(err, user) {
        if(!err && user) {
            if (user.password == password) {
                cb(true, user);
            } else {
                cb(false, null);
            }
        } else {
            cb(false, null);
        }
    });
};

module.exports = User = gamedb.model('User', userSchema);
