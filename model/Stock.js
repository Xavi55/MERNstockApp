const mongoose = require('mongoose');
const Stock = new mongoose.Schema
({
    userID:String,
    stock:String
});

module.exports = mongoose.model('Stock',Stock);