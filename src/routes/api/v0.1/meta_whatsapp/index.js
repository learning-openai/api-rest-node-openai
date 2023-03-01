const MetaWhatsapp = require("./metaWhtsapp");


class IndexMetaWhatasapp{

    static async receiveMessageAndResponse(req, res, next){

       const messageData = await  MetaWhatsapp.receiveMetaWhatsappData(req,res,next);
       
       const messageClient = messageData.message;
       console.log(' --message client --')
       console.log(messageClient)
       const messageResponseClient = 'this message responsive to client'
       const whatsappNumber = messageData.whatsappNumberClient;
       
        

       MetaWhatsapp.sentMessageWatsappCloudApi(messageResponseClient, whatsappNumber);


           
        // res.status(200).send({status:"success"})
    }
}

module.exports = IndexMetaWhatasapp;