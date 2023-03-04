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
    dateCreatedAcount : { type : Date, default : Date.now },
    updateDateAcount : { type : Date, default : Date.now }

})

var user = mongoose.model('user', User);

module.exports = {
    user
}
