const MetaWhatsapp = require("./metaWhtsapp");


class IndexMetaWhatasapp{

    static async receiveMessageAndResponse(req, res, next){

      try {
        const messageData = await  MetaWhatsapp.receiveMetaWhatsappData(req,res,next);
        if(messageData.error==='error'){
          console.log('Error decode data meta-whatsapp-message')
          return null
        }
        const messageClient = messageData.message;
        console.log(' --message client --')
        console.log(messageClient)
        const messageResponseClient = 'this message responsive to client'
        const whatsappNumber = messageData.whatsappNumberClient;
        
         
 
        MetaWhatsapp.sentMessageWatsappCloudApi(messageResponseClient, whatsappNumber);
 
 
            
        //  res.status(200).json({status: 'success'})
         res.status(200).json('EVENT_RECEIVED')
      } catch (e) {
        console.log('Error')
        console.log(e)
      }
    }
}

module.exports = IndexMetaWhatasapp;