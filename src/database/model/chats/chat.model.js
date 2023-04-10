'use strct'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const Chat = new Schema({
    idService: String,
    idMessageEmbeeding:String,
    allMessages:[{
        ref:'clientMessage',
        type:Schema.Types.ObjectId
    },{
        ref:'answerMessage',
        type:Schema.Types.ObjectId
    }],

    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}

})



const ModelChat = mongoose.model('chat', Chat);


module.exports = {
    ModelChat
}