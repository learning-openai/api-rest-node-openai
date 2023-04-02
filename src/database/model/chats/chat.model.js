'use strct'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const Chat = new Schema({
    idService: String,
    idMessageEmbeeding:String,
    clientMessages:[{
        ref:'clientMessage',
        type:Schema.Types.ObjectId
    }],
    answerMessages:[{
        ref:'answerMessage',
        type:Schema.Types.ObjectId
    }]
})



const chatModel = mongoose.model('chat', Chat);


module.exports = {
    chatModel
}