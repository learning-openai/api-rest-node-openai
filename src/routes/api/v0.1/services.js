const express = require('express');
const IndexEmbedding = require('./openai/embeddings');

const router = express.Router();

router.get('/',(req, res)=>{
    res.send({message:'Server run succesfull'});
})

router.get('/embedding/word=:word', IndexEmbedding.searchEmbedding,(req, res)=>{
    console.log('endpoint embedding')
    res.send('enpoint embedding')
})









module.exports = router