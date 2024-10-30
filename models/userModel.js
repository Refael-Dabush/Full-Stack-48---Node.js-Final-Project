const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: {type: String, required: true },
        numOfActions: {type: Number, required: true}
    }
);

const User = mongoose.model('user', userSchema, 'users');

module.exports = User;