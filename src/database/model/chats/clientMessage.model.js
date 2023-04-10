'use strict'
const mongoose = require('mongoose');

// para los mensajes de respuest
const { Schema } = mongoose;

const ClientMessage = new Schema({
    idChat : String,
    idService:String,
    idMsEmbedding:String,
    remitente:String,
    destinatario:String,
    message:String,
    timestamp:String,
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})


const ClientMessageModel = mongoose.model('clientMessage', ClientMessage);

module.exports = {
    ClientMessageModel
}