var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    profile: String,
});
const userCollection = mongoose.model("users", User);

module.exports = userCollection;