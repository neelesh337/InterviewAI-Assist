const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: [true, "username already taken"],
            required: true
        },
        email: {
            type: String,
            unique: [true, "email already registered"],
            required: true
        },
        password: {
            type: String,
            require: true
        }
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;