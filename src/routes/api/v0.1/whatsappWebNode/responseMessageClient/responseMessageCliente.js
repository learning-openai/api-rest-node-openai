'use strict'

const { messageEmbedding } = require("../../../../../database/model/messageEmbedding.model");
const { service } = require("../../../../../database/model/service.model");
const { user } = require("../../../../../database/model/user.model");
const StandardResponse = require("../../utils/standardResponse/standardResponse");

class ResponseMessage{
    

    static async services(phoneNumberService){

        try {
            console.log('--- class response ----')
            // Helo
            // from 59169651053@c.us
            // to 59176160723@c.us
            const servicePhoneNumber = await phoneNumberService.split('@')[0];
            // const messageCliente = message;
            console.log(servicePhoneNumber)

            const DATA_SERVICES = await service.findOne({slugPhoneNumber:servicePhoneNumber, state:true});
            console.log(DATA_SERVICES);
            if(!DATA_SERVICES){
                console.log('-- No hay servicios o esta inactivo --');
                var response = await StandardResponse.errorResp(' No hay servicios o esta inactivo ',[])
                return response;
            }
    
            // const DATA_USER = await user.findOne({slugPhoneNumber:servicePhoneNumber});
            // if(!DATA_USER){
            //     console.log('-- El usuario no existe --');
            //     var response = await StandardResponse.errorResp('no se encontro al usuario',[])
            //     return response;
            // }
            // console.log(DATA_USER);
            // const idUserOwner = DATA_USER._id;
    
          
    
            
            const MESSAGE_EMBEDDINGS = await messageEmbedding.find({idService:DATA_SERVICES._id, state:true});
            console.log(MESSAGE_EMBEDDINGS)
            if(MESSAGE_EMBEDDINGS.length===0){
                console.log('-- No existen servicios --');
                var response = await StandardResponse.errorResp('No hay servicio',[])
                return response;
            }
            
            var response = await StandardResponse.successfulResp('liste de servicios',MESSAGE_EMBEDDINGS);
            return response;

        } catch (error) {
                console.log('-- Error search services --');
                console.log(error);
                var response = await StandardResponse.errorResp('Error search services',[])
                return response;
        }

    }
}



module.exports = ResponseMessage;