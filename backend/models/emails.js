const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true,
        unique: true,
    },
    to:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Email', EmailSchema);