'use strict'

const  { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

class WhatsappWebClient{

    static async initWhatssapWeb(req, res, next){
        
        const client = new Client();

        client.once('qr', (qr) => {
            var counter = 0;
            console.log('QR RECEIVED', qr);

            qrcode.toDataURL(qr, (err, url) => {
                if (err) {
                  console.log('Error generating QR code');
                  return;
                }

                // console.log(url)
                if(counter==0){
                    res.status(200).send(`<img src="${url}" />`);
                }
              });

              
        });


        client.on('ready', () => {
            console.log('Client is ready!');
        });


        client.on('message', message=>{
            console.log(message.body)
            console.log(message?.from)
            console.log(message?.to)
            
            if(message?.body ==='hello'){
                const response = 'this meesage for test - services wsp web: ulr for test: https://www.google.com';
                client.sendMessage(message?.from,response)
            }
            
        })
        



        client.initialize();
    }
}



module.exports = WhatsappWebClient