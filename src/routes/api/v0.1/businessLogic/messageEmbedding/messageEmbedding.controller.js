'use strict'

const ApiStantarResponse = require("../../utils/standardResponse/standardApiResponse");
const Verify = require("../../utils/verifyCampos/verifyCampos");
const messageEmbeddingModel = require('../../../../../database/model/messageEmbedding.model');
const Embeddings = require("../../openai/embeddings/embedding");

const { service } = require("../../../../../database/model/service.model");


class MessageEmbedding{
    
    static async createMessageEmebedding(req, res, next){
        
        try {
            console.log('services')
            const { idService, title, description, price, urlResource, location }  = req.body;
    
                const verifyCampos =  await Verify.verificacionCamposRequeridos([ idService, title, description, price ]);
                if(!verifyCampos){
                    var response = await ApiStantarResponse.jsonResponse(1, 'Error de validación: Complete los campos requeridos',[]);
                    return res.status(400).send(response);
                }

                const verifyExistIdServ = await service.findById({_id:idService});
                if(!verifyExistIdServ){
                    console.log('-- El id del servicio no existe --');
                    console.log(`idService : ${verifyExistIdServ}`)
                    var response = await ApiStantarResponse.jsonResponse(1,`Error de validacion, el id servicio ${idService} no existe`, [])
                   return res.status(400).send(response)
                }

                if(verifyExistIdServ?.state === false){
                    console.log('-- El servicios esta inactivo --');
                    console.log(`idService : ${verifyExistIdServ}`)
                    var response = await ApiStantarResponse.jsonResponse(1,`Error inactivo, el estado del servicio esta inactivo`, [verifyExistIdServ])
                   return res.status(400).send(response)
                }

                const listMessageEmbedding = await  messageEmbeddingModel.messageEmbedding.find({idService});
                console.log(listMessageEmbedding);
    
                const limitMessagesE = 30;
                if(listMessageEmbedding.length >= limitMessagesE){
                    console.log('-- lleggo al limite de mensajes--')
                    console.log(listMessageEmbedding)
                    var response = await ApiStantarResponse.jsonResponse(1,`Limite de mensajes, ya llego al limite de ${limitMessagesE} mensajes de respestas automatizadas`, [...listMessageEmbedding])
                   return res.status(400).send(response)
                }
    
                const existTitle = await messageEmbeddingModel.messageEmbedding.find({idService,title});
                if(existTitle.length>=1){
                    console.log('-- El titulo ya fue agrgado --')
                    console.log(listMessageEmbedding)
                    var response = await ApiStantarResponse.jsonResponse(1,`El titulo ya existe, el titulo del mensaje ya fue agregado`, [...listMessageEmbedding])
                    return res.status(400).send(response)
                }


                const titleEmbedding = await  Embeddings.createEmbedding(title)
        
                var newMessageEmbedding = new messageEmbeddingModel.messageEmbedding({
                    idService: idService,
                    title: title,
                    description: description,
                    price: price,
                    urlResource: urlResource,
                    location: location,
                    embeddingTitle:titleEmbedding
                })
        
                var response = await newMessageEmbedding.save();

                console.log('--- Registered message embedding, ok----')

                const serviceData = await service.findById({_id:idService});
                const messageEmbeddings = await serviceData?.messageEmbeddings;
                const newDataMsEmbeddings = await [...messageEmbeddings,response._id]
                await service.findByIdAndUpdate({_id:idService},{messageEmbeddings:newDataMsEmbeddings});
                
                var resJson = await ApiStantarResponse.jsonResponse(0,'Registro realizado exitosamente,',[response])
                return res.status(200).send(resJson);
                
        } catch (error) {
            console.log('Error created message embedding');
            console.log(error);
            var response = await ApiStantarResponse.jsonResponse(1,'error creating a new message embedding',[]);
            return res.status(400).send(response)
        }
    }

    // return list message services search for idService
    static async getListMsEmebeddings(req, res, next){

        try {
            const {idService} = req.body;

            const verifyCampos =await  Verify.verificacionCamposRequeridos([idService])
            if( idService?.length!=24 || !verifyCampos ){
                console.log('Error id serveice invalid');
                var response = await ApiStantarResponse.jsonResponse(1,'Error de validacion, el id del servicio es requerido',[]);
                return res.status(400).send(response)
            }
    
            const ListDataMsEmbeddings = await  messageEmbeddingModel.messageEmbedding.find({idService});
            var response = await ApiStantarResponse.jsonResponse(0,`Consulta exitosa, resultados ${ListDataMsEmbeddings?.length}`,[...ListDataMsEmbeddings]);
    
            res.status(200).send(response)
        } catch (error) {
            console.log('Error search list messages embedding ');
            console.log(error);
            var response = await ApiStantarResponse.jsonResponse(1,'error de busqeuda, error al buscar los msEmbeddings del servicio',[]);
            return res.status(400).send(response)
        }
    }

    
}


module.exports = MessageEmbedding