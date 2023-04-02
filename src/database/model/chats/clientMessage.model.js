'use strict'
const mongoose = require('mongoose');

// para los mensajes de respuest
const { Schema } = mongoose;

const ClientMessage = new Schema({
    idService:String,
    idMsEmbedding:String,
    to:String,
    from:Number,
    message:String,
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})


const clientMessageModel = mongoose.model('clientMessage', ClientMessage);

module.exports = {
    clientMessageModel
}