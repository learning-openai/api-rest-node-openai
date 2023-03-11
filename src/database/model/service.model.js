'use strict'

const mongoose = require('mongoose');
const  { Schema } = mongoose;

// servicios y respuestas de mensaje

const Service = new Schema({
    name:String,
    description:String,
    userId:{
        ref:'user',
        type:Schema.Types.ObjectId
    },
    messageEmbeddings:[
        {
            ref:'messageEmbedding',
            type: Schema.Types.ObjectId
        }
    ],
    answeredMessages:[
        {
            ref:'answeredMessage',
            type: Schema.Types.ObjectId
        }
    ],
    state:{
        type: Boolean,
        enum:[true, false],
        default:true
    },
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})

var service = mongoose.model('service', Service);

module.exports = {
    service
}