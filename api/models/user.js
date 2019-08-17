const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 32
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 32
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    primaryPhone: {
        type: String,
        required: false,
        min: 10,
        max: 24
    },
    address: {
        type: String,
        required: false,
        min: 3,
        max: 128
    },
    city: {
        type: String,
        required: false,
        min: 3,
        max: 64
    },
    state: {
        type: String,
        required: false,
        min: 2,
        max: 64
    },
    country: {
        type: String,
        required: false,
        min: 2,
        max: 64
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 128
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model("user", userSchema);
module.exports = User;