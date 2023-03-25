'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;

const CredentialWhatsappCouldApi = new Schema({
    serviceId   :   String,                // id del servicio al que pertenece
    tokenAccesWhatsappClousdApi : String,  // este toke se obtiene de Whtsapp could api
    phoneNumber: String,
    idPhoneNumber   :    String,
    idAccuontWhapsappBusiness: String,
    nameProjectAppInMeta    :   String,  // nombre con el que se creo la app en meta
    idProjectAppInMeta  :   String,     // id de pojecto de la app con el que se creo en meta
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}

})

var credentialWhatsappCloudApi = mongoose.model('credentialWhatsappCloudApi', CredentialWhatsappCouldApi);

module.exports = {
    credentialWhatsappCloudApi
}
