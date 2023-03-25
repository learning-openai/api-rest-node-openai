const express = require('express');
const IndexEmbedding = require('./openai/embeddings');
// const TwilioServer = require('./twilio/twilio');
const MetaWhatsapp = require('./meta_whatsapp/metaWhtsapp');
const IndexMetaWhatasapp = require('./meta_whatsapp');

const WhatsappWebClient = require('./whatsappWebNode/index');
const UserController = require('./businessLogic/user');
const ServiceController = require('./businessLogic/service/service.controller');
const MessageEmbedding = require('./businessLogic/messageEmbedding/messageEmbedding.controller');
const CredentialWhatsappApiCloud = require('./businessLogic/credentialWhatappApiCloud/credentialWhatsappApiCloud.controller');
const WhatsappCloudApi = require('./whatsappCloudApi/whatsappCloudApi');

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


//(Actual) Whatsapp cloud api
router.get('/whtsappcloudapi', WhatsappCloudApi.verifyTokenWhasappCloudApi);
router.post('/whtsappcloudapi', WhatsappCloudApi.receiveMessageWhatsappCloudApi) 

//  send messaje 
// router.get('/sendmessage',IndexMetaWhatasapp.receiveMessageAndResponse)


// whatsap-webjs client
router.get('/qr-code', WhatsappWebClient.initWhatssapWeb)


// User
router.post('/user', UserController.signUp);
router.post('/user/singin', UserController.signIn);
router.put('/user/update', UserController.update)


// services offered by the user
router.post('/service',ServiceController.create);
router.get('/service/idUser=:idUser', ServiceController.getListServces);


// Credential whatsapp api cloud
router.post('/credentials/whatsappapicloud/', CredentialWhatsappApiCloud.newCreadential);
router.post('/credentials/whatsappapicloud/update', CredentialWhatsappApiCloud.updateCredential);
router.get('/credentials/serviceId=:serviceId', CredentialWhatsappApiCloud.getListCredentials)


// message embedding
router.post('/messageembedding/create',MessageEmbedding.createMessageEmebedding)
router.post('/messageembedding/list', MessageEmbedding.getListMsEmebeddings);
router.post('/messageembedding/update', MessageEmbedding.updateMsEmbedding)


module.exports = router