'use strcit'
const mongoose = require('mongoose');

// para los mensajes de respuest
const { Schema } = mongoose;

const AnsweredMessages = new Schema({
    idMsEmbedding:String,
    to:String,
    from:Number,
    message:String,
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})


const answeredMessage = mongoose.model('answeredMessage', AnsweredMessages);

module.exports = {
    answeredMessage
}