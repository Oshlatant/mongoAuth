const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model('users', new Schema({
    username: String,
    email: String,
    isAdmin: Boolean,
    password: String,
}));