'use strcit'
const mongoose = require('mongoose');

// para los mensajes de respuest
const { Schema } = mongoose;

const AnswerMessages = new Schema({
    idService:String,
    idMsEmbedding:String,
    to:String,
    from:Number,
    message:String,
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})


const answerMessageModel = mongoose.model('answerMessage', AnswerMessages);

module.exports = {
    answerMessageModel
}