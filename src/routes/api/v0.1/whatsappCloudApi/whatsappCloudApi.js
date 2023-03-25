// token de verififcaion de se coloco en meta developer
// TOKEN OF VERIFY: tokenVerifyapinode
const tokenVerify = "tokenVerifyapinode"

// import axios
const axios = require('axios');
const StandardResponse = require('../utils/standardResponse/standardResponse');


const Embeddings = require('../openai/embeddings/embedding');
const { credentialWhatsappCloudApi } = require('../../../../database/model/credentialWhatsappApiCloud.model');
const { service } = require('../../../../database/model/service.model');
const { messageEmbedding } = require('../../../../database/model/messageEmbedding.model');



class WhatsappCloudApi{
    

  // verufica el token y le responde a la apia de whatsapp cloud para que se inicie con el servicio
  static async verifyTokenWhasappCloudApi(req, res, next){

        console.log('----verify token--- ')
        console.log(req)
        console.log(req?.headers)

        console.log('----hub-challenge---')
        const hudchallenge = req?.query['hub.challenge'];
        
        console.log(hudchallenge)
        // res.status(200).send(req.headers.authorization.split(' ')[1])
        // /metawhatsapp?hub.mode=subscribe&hub.challenge=1108383849&hub.verify_token=tokenVerifyapinode
        res.status(200).send(hudchallenge)
  }


  // receive data from meta-wwhatsapp
  static async receiveMessageWhatsappCloudApi(req, res, next){

      console.log('--- post received data from whatsapp cloud api ---')
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
          console.log('-- Received data from whatsapp cloud api - sin message --');
          console.log(JSON.stringify(data))
          return res.status(200).send({status:'success'});
        }

        const whatsappNumberOwnerService = data?.entry[0]?.changes[0]?.value?.metadata?.display_phone_number;
        const whatsappNumberClient = data["entry"][0]["changes"][0]["value"]["messages"][0]["from"]
        const message = data["entry"][0]["changes"][0]["value"]["messages"][0]["text"]["body"]
        const idWAMessage = data["entry"][0]["changes"][0]["value"]["messages"][0]["id"]
        const timestamp = data["entry"][0]["changes"][0]["value"]["messages"][0]["timestamp"]

        console.log({
            whatsappNumberOwnerService,
            whatsappNumberClient,
            message,
            idWAMessage,
            timestamp
        })
        
        const messageData = {
            whatsappNumberOwnerService,
            whatsappNumberClient,
            message,
            idWAMessage,
            timestamp
        }

        responseUserWhatsappApi(messageData)

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



  static async sentMessageWhatsappCloudApi(texOnlineMessage ='Message text example', dataMessage){

        try {

          const {
            whatsappNumberOwnerService,
            whatsappNumberClient,
            message,
            idWAMessage,
            timestamp

          } = dataMessage;

          
          const CREDENTIAL = await credentialWhatsappCloudApi.findOne({phoneNumber:whatsappNumberOwnerService});
          if(!CREDENTIAL){
              console.log(`--(whatsappCloudApi class) msg, el numero ${whatsappNumberOwnerService} no tiene ningu tipo de credenciales`);
              return;
          }

        const whatsappNumberDestination = whatsappNumberClient;
        const messageText = texOnlineMessage;
        const tokenAccess = CREDENTIAL?.tokenAccesWhatsappClousdApi
        const idPhoneNumber = CREDENTIAL?.idPhoneNumber;

        const headers = {
            'Authorization': `Bearer ${tokenAccess}`,
            'Content-Type': 'application/json'
          };
          
          const data = {
            messaging_product: 'whatsapp',
            to: whatsappNumberDestination,
            type:'text',
            text: {
              body:messageText
            }
            
          };
          
          // const response = await axios.post('https://graph.facebook.com/v15.0/108919802138779/messages', 
          const response = await axios.post(`https://graph.facebook.com/v16.0/${idPhoneNumber}/messages`, 
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
        console.log(e?.response)
        // console.log(e.headers)
        }
        
    }
}


// Function


async function responseUserWhatsappApi(dataMessage){
    // const whatsappMessage = dataMessage.message;
    // const whatsappNumberOwnerService = dataMessage.whatsappNumberOwnerService;

    const {
        whatsappNumberOwnerService,
        whatsappNumberClient,
        message,
        idWAMessage,
        timestamp
    } = dataMessage;

    const credentials = await credentialWhatsappCloudApi.findOne({phoneNumber:whatsappNumberOwnerService});
    if(!credentials){
        console.log(`--(whatsappCloudApi) msg, el numero ${whatsappNumberOwnerService} no tiene ningu tipo de credenciales`);
        return;
    }

    const serviceData = await service.findById({_id:credentials.serviceId});
    if(!serviceData){
        console.log(` -- (Whatsapp-cloud-api) msg, el servicio perteneciente al whatsall : ${whatsappNumberOwnerService} no exite `);
        return;
    }

    if(serviceData?.state===false){
        console.log(` -- (Whatsapp-cloud-api) msg, el servicio perteneciente al whatsapp : ${whatsappNumberOwnerService} no esta activo --> state=false `);
        return;
    }

    console.log(serviceData,'------------------------------');
    const embeddingsData = await messageEmbedding.find({idService:serviceData._id});
    console.log(embeddingsData)
    if(embeddingsData.length===0){
        console.log(`-- (whatsapp-cloud-api) msg, el servicio con id:${serviceData._id} no titne messages embeddings para responde al cliente `);
        return;    
    }
    


    const listOrderEmbeddings = await Embeddings.SearchEmbeddingServices(message ,embeddingsData);
    if(listOrderEmbeddings.length==0){
      console.log('-- (whatsapp-cloud-api) No hay coincidencia con la lista de embeddings, no tiene embeddings --')
      return null;
    }

    const dataCompletation = await Embeddings.createCompletationService(listOrderEmbeddings[0]);
    console.log(dataCompletation[0].text)
    // const onlyText = dataCompletation[0].text
    const onlyText = dataCompletation[0].text.trim().replace(/\n/g, '').replace(/\r/g, '').replace(/\s\s+/g, ' ').replace(/^R:\s*/i, '').replace(/^Respuesta:\s*/i, '');

    // if(listOrderEmbeddings.length>0){
    //     const responseGenerateChatGPT = await Embeddings.createCompletationService(listOrderEmbeddings[0]);
    //     // texto = texto.replace(/(\n\s*\n\s*|\n\s*\+\s*\n\s*)/g, '');
    //     const textResponse = responseGenerateChatGPT[0].text.trim().replace(/\n/g, '').replace(/\r/g, '').replace(/\s\s+/g, ' ').replace(/^R:\s*/i, '').replace(/^Respuesta:\s*/i, '');
    //     client.sendMessage(phoneNumberCient, textResponse)
    // }

    WhatsappCloudApi.sentMessageWhatsappCloudApi(onlyText, dataMessage)

}



module.exports = WhatsappCloudApi;

