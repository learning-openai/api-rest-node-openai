'use strict' 


const mongoose = require('mongoose');

// para almacenar los mensajes  con sus embeddings
const { Schema } = mongoose;

const MessageEmbedding = new Schema({
    idService: String,
    title: String,
    description: String,
    price: Number,
    urlResource: String,
    location: String,
    state:{
        type: Boolean,
        enum:[true, false],
        default:true
    },
    embeddingTitle:[],
    answerMessages:[
        {
            ref:'answerMessage',
            type:Schema.Types.ObjectId
        }
    ],
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})


const messageEmbedding = mongoose.model('messageEmbedding', MessageEmbedding);

module.exports = {
    messageEmbedding
}