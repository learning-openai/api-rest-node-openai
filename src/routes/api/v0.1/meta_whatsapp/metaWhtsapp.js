// token de verififcaion de se coloco en meta developer
// TOKEN OF VERIFY: tokenVerifyapinode
const tokenVerify = "tokenVerifyapinode"

// import axios
const axios = require('axios');
const StandardResponse = require('../utils/standardResponse/standardResponse');


class MetaWhatsapp{
    
  static async verifyTokenMeta(req, res, next){

        console.log('----verify token--- ')
        console.log(req)
        console.log(req?.headers)

        console.log('----hub-challenge---')
        const hudchallenge = req?.query['hub.challenge']
        console.log(hudchallenge)
        // res.status(200).send(req.headers.authorization.split(' ')[1])
        // /metawhatsapp?hub.mode=subscribe&hub.challenge=1108383849&hub.verify_token=tokenVerifyapinode
        res.status(200).send(hudchallenge)
  }


  // receive data from meta-wwhatsapp
  static async receiveMetaWhatsappData(req, res, next){

      console.log('--- post received data meta ---')
      // console.log(req)
      // -los datos vieneen en el body --> req.body
      // body: { object: 'whatsapp_business_account', entry: [ [Object] ] },...
      try {
                
        const data = req?.body;
        // console.log(data)
        // console.log(data?.entry[0]?.changes)
        // console.log(data?.entry[0]?.changes[0]?.value?.metadata)
        // console.log(data?.entry[0]?.changes[0]?.value?.statuses)
        // console.log(data?.entry[0]?.changes[0]?.value?.statuses[0]?.conversation)
        // console.log(data?.entry[0]?.changes[0]?.value?.statuses[0]?.conversation?.origin)

        console.log(JSON.stringify(data));

        const existMessage = data?.entry[0]?.changes[0]?.value?.messages;
        if(existMessage === undefined || existMessage === null){
          console.log('-- Received data from meta-whatsapp api - sin message --');
          console.log(JSON.stringify(data))
          res.status(200).send({status:'success'});
        }

        const whatsappNumberClient = data["entry"][0]["changes"][0]["value"]["messages"][0]["from"]
        const message = data["entry"][0]["changes"][0]["value"]["messages"][0]["text"]["body"]
        const idWAMessage = data["entry"][0]["changes"][0]["value"]["messages"][0]["id"]
        const timestamp = data["entry"][0]["changes"][0]["value"]["messages"][0]["timestamp"]

        console.log({
            whatsappNumberClient,
            message,
            idWAMessage,
            timestamp
        })
        
        const messageData={
          whatsappNumberClient,
          message,
          idWAMessage,
          timestamp
        }

        // return messageData;
        // res.status(200).send('EVENT_RECEIVED')
        res.status(200).send({status:"success"})

      } catch (e) {
        console.log('--  Error meta receive message whatsapp --');
        console.log(e)

        // const resp = await StandardResponse.errorResp('Error meta-receive data message whatsapp');
        // return resp;
        // res.status(200).send('EVENT_RECEIVED')
      }

  }

    static async sentMessageWatsappCloudApi(message ='Message text example', whatsappNumber='59169651053'){

       try {
        const whatsappNumberDestination = whatsappNumber;
        const messageText = message;
        const tokenAccess = process.env.ACCESS_TOKEN_META_WHATSAPP;
        const idPhoneNumber = process.env.ID_PHONE_NUMBER;

        const headers = {
            'Authorization': `Bearer ${tokenAccess}`,
            'Content-Type': 'application/json'
          };
          
          const data = {
            messaging_product: 'whatsapp',
            to: whatsappNumberDestination,
            text: {
              body:messageText
            },
            type:'text'
            
          };
          
          // const response = await axios.post('https://graph.facebook.com/v15.0/108919802138779/messages', 
          const response = await axios.post(`https://graph.facebook.com/v15.0/${idPhoneNumber}/messages`, 
                                              data,
                                              {
                                                headers: headers
                                              }
                                            );
          const whatsappApiResponse = response.data;
          console.log(`se envio el mesnsaje a : ${whatsappNumberDestination}`)
          console.log(whatsappApiResponse)

       } catch (e) {
        console.log('error send message whatsapp cloud api');
        console.log(e)
       }
        
    }
}

module.exports = MetaWhatsapp;

