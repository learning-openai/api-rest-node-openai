'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    specialty:String,
    phone:String,
    age:Number,
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}

})

var user = mongoose.model('user', User);

module.exports = {
    user
}
