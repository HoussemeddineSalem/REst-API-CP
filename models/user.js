const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    title: String,
    content: String
});

module.exports = userModel;