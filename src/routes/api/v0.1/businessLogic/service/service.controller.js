'use strict'
const serviceModel = require('../../../../../database/model/service.model');
const ApiStantarResponse = require('../../utils/standardResponse/standardApiResponse');
const Verify = require('../../utils/verifyCampos/verifyCampos');


class ServiceController{
    
    static async create(req, res, next){

        console.log('services')
        const { name, description, userId, phoneNumber, areaCode }  = req.body;

            const verifyCampos =  await Verify.verificacionCamposRequeridos([name, description, userId, phoneNumber, areaCode]);
            if(!verifyCampos){
                var response = await ApiStantarResponse.jsonResponse(1, 'Error de validación: Complete los campos requeridos',[]);
                return res.status(400).send(response);
            }
    
            const listSevices = await  serviceModel.service.find({userId});
            console.log(listSevices);

            if(listSevices.length>=1){
                console.log('-- ya tiene un servicio activo --')
                console.log(listSevices)
                var response = await ApiStantarResponse.jsonResponse(1,'El usuario ya tiene un servicio, por el momento solo se puede agragr un solo servicio', [...listSevices])
               return res.status(400).send(response)
            }

            const phoneNuber =  `${areaCode}${phoneNumber}`
            const veryNumberPhone =await serviceModel.service.find({slugPhoneNumber:phoneNuber})
            if(veryNumberPhone.length>0){
                console.log('-- el numero de whatsapp del servicio ya fue regitrado --')
                console.log(listSevices)
                var response = await ApiStantarResponse.jsonResponse(1,'Error de validacion, el numero de whatsapp del servicio ya fue registrado', [...veryNumberPhone])
               return res.status(400).send(response)
            }

        
    
            var newService = new serviceModel.service({
                name:name,
                description:description,
                userId:userId,
                messageEmbeddings:[],
                answeredMessages:[],
                phoneNumber:phoneNumber,
                areaCode:areaCode,
                slugPhoneNumber:`${areaCode}${phoneNumber}`,
            })
    
            var response = await newService.save();
            console.log('--- Registered service ok----')

            var resJson = await ApiStantarResponse.jsonResponse(0,'succesfull, created services',[response])
            return res.status(200).send(resJson)
    }



    static async getListServces(req, res, next){

        const {idUser} = req.params;
        
        const verifyCampos = Verify.verificacionCamposRequeridos([idUser]);
        if(!verifyCampos){
            let response = await ApiStantarResponse.jsonResponse(1,'Error de validacin, el id el usuario es requerido',[]);
            res.status(404).send(response)
        }
        
        const dataServices = await serviceModel.service.find({userId:idUser});
        let response = await ApiStantarResponse.jsonResponse(0,'Susccesful, list services',[...dataServices])
        
        res.status(200).send(response)
    }


    static async deleteService(req, res, next){
        
    }

}


module.exports = ServiceController;