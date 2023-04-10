'use strict'

const { ModelChat } = require("../../../../../database/model/chats/chat.model");
const { ClientMessageModel } = require("../../../../../database/model/chats/clientMessage.model");


class MessageChat{

    constructor(idService, idMessageEnbedding, contenido, remitente, destinatario){
        this.idService = idService;
        this.idMessageEnbedding = idMessageEnbedding;
        this.contenido = contenido;
        this.timestamp = Math.floor(new Date().getTime()/1000);
        this.remitente = remitente;
        this.destinatario = destinatario;
    }

}



class Chat{
    

    static async createClientMessage(messageChat){
        console.log('--------------------------------')
        console.log('createClientMessage')
        console.log(messageChat)

        // si el remitete no existe (numero de whatsapp del cliente), se crea un nuevo chat
        const listMessaggeClient = await ClientMessageModel.find({remitente:messageChat?.remitente});

        console.log(listMessaggeClient)
        if(listMessaggeClient.length === 0){
            const newChat = new ModelChat({
                idService : messageChat?.idService,
                idMessageEmbeeding : messageChat?.idMessageEmbeeding,
                allMessages:[]
            })

            const resultChat = await newChat.save();

            if(resultChat?._id){
                var chatClient = ClientMessageModel({
                    idChat:resultChat?._id,
                    idService : messageChat?.idService,
                    idMsEmbedding : messageChat?.idMessageEmbeeding,
                    remitente : messageChat?.remitente,
                    destinatario : messageChat?.destinatario,
                    message : messageChat?.contenido,
                    timestamp :messageChat?.timestamp ,  //teimestamp actula en minutos
                })

                const dataMessaClient = await chatClient.save();

                if(dataMessaClient?._id){

                    var dataChat = await ModelChat.findById({_id:newChat?._id});
                    var listIdsMessages  = dataChat.allMessages; 
                    dataChat.allMessages =await [...listIdsMessages, dataMessaClient?._id];
                    const updateChat = await ModelChat.findOneAndUpdate({_id:newChat?._id},dataChat);

                    var dataChatUpdated = await ModelChat.findById({_id:newChat?._id});
                    console.log(dataChatUpdated)
                }
                
            }

            if(listMessaggeClient.length > 0){
                
                var chatClient = ClientMessageModel({
                    idChat:listMessaggeClient[0]?.idChat,
                    idService : messageChat?.idService,
                    idMsEmbedding : messageChat?.idMessageEmbeeding,
                    remitente : messageChat?.remitente,
                    destinatario : messageChat?.destinatario,
                    message : messageChat?.contenido,
                    timestamp :messageChat?.timestamp ,  //teimestamp actula en minutos
                })

                var dataMessaClient = await chatClient.save();

                if(dataMessaClient?._id){

                    var dataChat = await ModelChat.findById({_id:listMessaggeClient[0]?.idChat});
                    var listIdsMessages  = dataChat.allMessages; 
                    dataChat.allMessages =await [...listIdsMessages, dataMessaClient?._id];
                    const updateChat = await ModelChat.findOneAndUpdate({_id:listMessaggeClient[0]?.idChat},dataChat);

                    var dataChatUpdated = await ModelChat.findById({_id:listMessaggeClient[0]?.idChat});
                    console.log(dataChatUpdated)
                }
            }

        }

    }


    static async createAnswerMessage(messageChat){
        console.log('--------------------------------')
        console.log('createAnswerMessage')
        console.log(messageChat)
    }

}


module.exports = {
    Chat : Chat,
    MessageChatLocalModel: MessageChat
}

