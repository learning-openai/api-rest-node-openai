'use strict'
const serviceModel = require('../../../../../database/model/service.model');
const ApiStantarResponse = require('../../utils/standardResponse/standardApiResponse');
const Verify = require('../../utils/verifyCampos/verifyCampos');


class ServiceController{
    
    static async create(req, res, next){

        console.log('services')
        const { name, description, userId }  = req.body;

            const verifyCampos =  await Verify.verificacionCamposRequeridos([name, description, userId]);
            if(!verifyCampos){
                var response = await ApiStantarResponse.jsonResponse(1, 'Error de validación: Complete los campos requeridos',[]);
                return res.status(400).send(response);
            }
    
            const listSevices = await  serviceModel.service.find({userId});
            console.log(listSevices);

            if(listSevices.length ){
                console.log('-- ya tiene un servicio activo --')
                console.log(listSevices)
                var response = await ApiStantarResponse.jsonResponse(1,'El usuario ya tiene un servicio, por el momento solo se puede agragr un solo servicio', [...listSevices])
               return res.status(400).send(response)
            }
    
            var newService = new serviceModel.service({
                name:name,
                description:description,
                userId:userId,
                messageEmbeddings:[],
                answeredMessages:[],
            })
    
            var response = await newService.save();
            console.log('--- Registered service ok----')

            var resJson = await ApiStantarResponse.jsonResponse(0,'succesfull, created services',[response])
            return res.status(200).send(resJson)
    }



    static async update(req, res, next){
        
    }


    static async deleteService(req, res, next){
        
    }

}


module.exports = ServiceController;