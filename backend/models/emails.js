const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true,
        unique: false
    },
    to:{
        type: String,
        required: true,
        unique: false
    },
    text:{
        type: String,
        required: true,
        unique: false
    },
    read:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Email', EmailSchema);