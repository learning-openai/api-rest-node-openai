const express = require('express');
const IndexEmbedding = require('./openai/embeddings');
// const TwilioServer = require('./twilio/twilio');
const MetaWhatsapp = require('./meta_whatsapp/metaWhtsapp');
const IndexMetaWhatasapp = require('./meta_whatsapp');

const WhatsappWebClient = require('./whatsappWebNode/index');
const UserController = require('./businessLogic/user');
const ServiceController = require('./businessLogic/service/service.controller');
const MessageEmbedding = require('./businessLogic/messageEmbedding/messageEmbedding.controller');

const router = express.Router();

router.get('/',(req, res)=>{
    res.send({message:'Server run succesfull'});
})

// generate un embedding en base a un texto 
router.get('/enerateEmbedding/text=:text', IndexEmbedding.generaEmbedding)

router.get('/embedding/word=:word', IndexEmbedding.searchEmbedding,(req, res)=>{
    console.log('endpoint embedding')
    res.send('enpoint embedding')
})

// router.get('/twilio', TwilioServer.sendWhatsappMessage);


// meta whatsapp 
router.get('/metawhatsapp', MetaWhatsapp.verifyTokenMeta) // recibe un token desde facebook y responde a meta para el uso de whatsap could api
router.post('/metawhatsapp', MetaWhatsapp.receiveMetaWhatsappData); // recibe los mensajes que llega a un numero de whatsa que esta configurado en meta/developer

//  send messaje 
// router.get('/sendmessage',IndexMetaWhatasapp.receiveMessageAndResponse)


// whatsap-webjs client
router.get('/qr-code', WhatsappWebClient.initWhatssapWeb)


// User
router.post('/user', UserController.signUp);
router.get('/user/singin', UserController.signIn);
router.put('/user/update', UserController.update)


// services offered by the user
router.post('/service',ServiceController.create);


// message embedding
router.post('/messageembedding/create',MessageEmbedding.createMessageEmebedding)
router.get('/messageembedding/list', MessageEmbedding.getListMsEmebeddings)


module.exports = router