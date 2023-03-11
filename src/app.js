require('dotenv').config()

const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')

const services = require('../src/routes/api/v0.1/services');
const connection = require('../src/database/connectionDB')

// whatsapp web
// const clientWhatsapp = require('./routes/api/v0.1/whatsappWebNode/whatsappWebNode');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/',services)
app.use('/api/v01',services)

const PORT = process.env.PORT || 4000;





app.listen(PORT, ()=>{
    console.log(`Run server in port: ${PORT}`);
})