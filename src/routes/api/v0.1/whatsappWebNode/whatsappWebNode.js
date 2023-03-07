'use strict'

const  { Client } = require('whatsapp-web.js');

const clientWhatsapp = new Client();

clientWhatsapp.on('qr',(qr)=>{
    console.log('QR RECEIVED',qr)
})

clientWhatsapp.on('ready',()=>{
    console.log('clienat is ready!')

})

clientWhatsapp.initialize();

module.exports = clientWhatsapp;