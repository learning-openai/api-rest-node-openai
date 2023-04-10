'use strcit'
const mongoose = require('mongoose');

// para los mensajes de respuest
const { Schema } = mongoose;

const AnswerMessages = new Schema({
    idChat:String,
    idService:String,
    idMsEmbedding:String,
    remitente:String,
    destinatario:String,
    message:String,
    timestamp:String,
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})


const AnswerMessageModel = mongoose.model('answerMessage', AnswerMessages);

module.exports = {
    AnswerMessageModel
}