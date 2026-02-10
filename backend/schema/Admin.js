const mongoose = require('mongoose');

const adminschema = new mongoose.Schema({
    name: String,
    password: String,
    image: String,
    role: String,
    email: { type: String, match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ }
})

const Admin = mongoose.model("Admin", adminschema);

module.exports = Admin;