const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        default: "user"
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User