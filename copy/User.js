const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

/* şemayı dışarı aktaralım */
module.exports = mongoose.model('kullanici', UserSchema);
