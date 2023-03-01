const express = require('express');
const IndexEmbedding = require('./openai/embeddings');
// const TwilioServer = require('./twilio/twilio');
const MetaWhatsapp = require('./meta_whatsapp/metaWhtsapp');
const IndexMetaWhatasapp = require('./meta_whatsapp');

const router = express.Router();

router.get('/',(req, res)=>{
    res.send({message:'Server run succesfull'});
})

router.get('/embedding/word=:word', IndexEmbedding.searchEmbedding,(req, res)=>{
    console.log('endpoint embedding')
    res.send('enpoint embedding')
})

// router.get('/twilio', TwilioServer.sendWhatsappMessage);


// meta whatsapp 
router.get('/metawhatsapp', MetaWhatsapp.verifyTokenMeta) // recibe un token desde facebook y responde a meta para el uso de whatsap could api
router.post('/metawhatsapp', IndexMetaWhatasapp.receiveMessageAndResponse); // recibe los mensajes que llega a un numero de whatsa que esta configurado en meta/developer

//  send messaje 
// router.get('/sendmessage',IndexMetaWhatasapp.receiveMessageAndResponse)






module.exports = router