const express = require('express');
const IndexEmbedding = require('./openai/embeddings');
// const TwilioServer = require('./twilio/twilio');
const MetaWhatsapp = require('./meta_whatsapp/metaWhtsapp');

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
router.get('/metawhatsapp', MetaWhatsapp.verifyTokenMeta)
router.post('/metawhatsapp', MetaWhatsapp.receiveMetaWhatsappData)






module.exports = router