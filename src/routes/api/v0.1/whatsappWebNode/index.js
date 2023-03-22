'use strict'

const  { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const ResponseMessage = require('./responseMessageClient/responseMessageCliente');
const Embeddings = require('../openai/embeddings/embedding');
const ApiStantarResponse = require('../utils/standardResponse/standardApiResponse');

class WhatsappWebClient{

    static async initWhatssapWeb(req, res, next){
        
        const client = new Client();

        client.once('qr',async (qr) => {
            var counter = 0;
            console.log('QR RECEIVED', qr);

            qrcode.toDataURL(qr, async (err, url) => {
                if (err) {
                  console.log('Error generating QR code');
                  let  response = await ApiStantarResponse.jsonResponse(1,'Error al generar QR',[err]);
                  return res.status(400).send(response);
                 
                }

                // console.log(url)
                if(counter==0){
                    // res.status(200).send(`<img src="${url}" />`);
                    let  response = await ApiStantarResponse.jsonResponse(0,'Codigo QR generado exitosamente',[url]);
                    res.status(200).send(response);
                }
              });

              
        });


        client.on('ready', () => {
            console.log('Client is ready!');
        });


        client.on('message', async (message)=>{
            console.log(message.body)
            console.log(message?.from)
            console.log(message?.to)

            // 59176160723@c.us
            // 59169651053@c.us

            const messageClient = message?.body;
            const phoneNumberCient = message?.from;
            const phoneNumberOwner = message?.to;

            const DATA_MESSAGES_EMBEDDING = await  ResponseMessage.services(phoneNumberOwner);
            console.log('data meesage embeddings', DATA_MESSAGES_EMBEDDING)

            if( DATA_MESSAGES_EMBEDDING?.ok === "successful" && DATA_MESSAGES_EMBEDDING?.data.length > 0){
                
                const listMessageEmbeddings = DATA_MESSAGES_EMBEDDING.data;
                const listOrderEmbeddings = await Embeddings.SearchEmbeddingServices( messageClient, listMessageEmbeddings );
                console.log('-- existe lista de message embedding --');

                if(listOrderEmbeddings.length>0){
                    const responseGenerateChatGPT = await Embeddings.createCompletationService(listOrderEmbeddings[0]);
                    // texto = texto.replace(/(\n\s*\n\s*|\n\s*\+\s*\n\s*)/g, '');
                    const textResponse = responseGenerateChatGPT[0].text.trim().replace(/\n/g, '').replace(/\r/g, '').replace(/\s\s+/g, ' ').replace(/^R:\s*/i, '').replace(/^Respuesta:\s*/i, '');
                    client.sendMessage(phoneNumberCient, textResponse)
                }
               
            }
            
            if(message?.body === 'hello'){
                const response = 'this meesage for test - services wsp web: ulr for test: https://www.google.com';
                client.sendMessage(message?.from, response);
            }
            
        })
        

        client.initialize();
    }
}



module.exports = WhatsappWebClient