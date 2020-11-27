var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 10;

// This file is equilent to Data Base
var userschema = new Schema({
    email: {
        type: String,
        required: true,        
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },    
    username: {
        type: String,
        required: true,
        trim: true
    },   
    
}, {
    timestamps: true,
    strict: true
})

userschema.statics.hashPassword = function hashPassword(encrypt_password) {
    return bcrypt.hashSync(encrypt_password, BCRYPT_SALT_ROUNDS);
}

userschema.methods.isValid = function (hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('User', userschema);
