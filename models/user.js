// ***************************************************
// required modules
const mongoose = require('mongoose');

//user Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});



const User = mongoose.model('User', userSchema);

//exports user
module.exports = User;