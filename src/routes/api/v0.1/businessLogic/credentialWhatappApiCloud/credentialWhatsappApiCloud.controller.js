'use strict'

const { json } = require("body-parser");
const { credentialWhatsappCloudApi } = require("../../../../../database/model/credentialWhatsappApiCloud.model");
const { service } = require("../../../../../database/model/service.model");
const ApiStantarResponse = require("../../utils/standardResponse/standardApiResponse");
const Verify = require("../../utils/verifyCampos/verifyCampos");


class CredentialWhatsappApiCloud{

    static async newCreadential(req, res, next){
        try {
            const     
            {
                serviceId ,                
                tokenAccesWhatsappClousdApi,
                phoneNumber,  
                idPhoneNumber,
                idAccuontWhapsappBusiness,
                nameProjectAppInMeta,  
                idProjectAppInMeta
            } = req.body;

            const veryaFilels =await  Verify.verificacionCamposRequeridos([
                serviceId ,                
                tokenAccesWhatsappClousdApi,
                phoneNumber,  
                idPhoneNumber,
                idAccuontWhapsappBusiness,
                nameProjectAppInMeta,  
                idProjectAppInMeta
            ]);

            if(!veryaFilels){
                let response = await ApiStantarResponse.jsonResponse(1, 'Error de validacion, complete los campos requeridos',[{serviceId ,                
                    serviceId : "" ,                
                    tokenAccesWhatsappClousdApi : "",
                    phoneNumber:"",  
                    idPhoneNumber : "",
                    idAccuontWhapsappBusiness : "",
                    nameProjectAppInMeta : "",  
                    idProjectAppInMeta : ""
                }]);
                console.log('--(Crete credential ws-cl-api) Error registered credentials whatsapp api cloud api  --');
                return res.status(400).send(response);
            }

            // si el servicios no fue encontrado
            const exisService = await service.find({_id:serviceId});
            if(exisService.length===0){
                let response = await ApiStantarResponse.jsonResponse(1,'Error de validacion, no existe el servicio con el serviceId proporcionado',[])
                console.log('--(Crete credential ws-cl-api) Error de validacion, no existe el servicio con el serviceId proporcionado  --');
                return res.status(400).send(response);
            }

            const exisCredentrial = await credentialWhatsappCloudApi.find({phoneNumber});
            if(exisCredentrial.length>0){
                let response = await ApiStantarResponse.jsonResponse(1,'Error de validacion, el numero de whatsapp ya fue registrado',[])
                console.log('-- (Crete credential ws-cl-api) Error de validacion, el numero de whatsapp ya fue registrado  --');
                return res.status(400).send(response);
            }

            const moreOneCredentail = await credentialWhatsappCloudApi.find({serviceId});
            if(moreOneCredentail.length>=1){
                let response = await ApiStantarResponse.jsonResponse(1,'Error de validacion, el servicio ya tiene un credencial de acceso registrado',[...moreOneCredentail])
                console.log('--(Crete credential ws-cl-api) Error de validacion, el servicio ya tiene un credencial de acceso registrado  --');
                return res.status(400).send(response);
            }


            const newCredential = new credentialWhatsappCloudApi({
                serviceId ,                
                tokenAccesWhatsappClousdApi,
                phoneNumber,  
                idPhoneNumber,
                idAccuontWhapsappBusiness,
                nameProjectAppInMeta,  
                idProjectAppInMeta
            });

            let result = await newCredential.save();
            console.log('-- (Crete credential ws-cl-api): succces credentail created successful --')
            let response = await ApiStantarResponse.jsonResponse(0,'Succesful, credencial registrado exitosamente',[result]);
            return res.status(200).send(response)

        } catch (error) {
             let response = await ApiStantarResponse.jsonResponse(1,`Error, algo salio mal en el registro del credencial, error: ${error}`,[])
                console.log('--(Crete credential ws-cl-api) Error, algo salio mal en el registro del credencia --',error);
                return res.status(400).send(response);
        }
    }

    static async getListCredentials (req, res, next){
        const { serviceId } = req.params;

        const veriFyFiled = await Verify.verificacionCamposRequeridos([ serviceId ]);
        if(!veriFyFiled){
            let response = await ApiStantarResponse.jsonResponse(1, 'Error de validacion, complete los campos requeridos, en el params',[{serviceId ,                
                serviceId:""
            }]);
            console.log('--(getlist credential ws-cl-api) Error update campos requeridos api cloud api  --');
            return res.status(400).send(response);
        }

        const dataServices = await credentialWhatsappCloudApi.find({serviceId});
        let response = await ApiStantarResponse.jsonResponse(0,`successful, lista de credenciales, resultados: ${dataServices.length}`,dataServices);
        res.status(200).send(response)
    }



    static async updateCredential(req, res, next){
        try {
            const     
            {
                credentialId ,                
                tokenAccesWhatsappClousdApi,
                phoneNumber,  
                idPhoneNumber,
                idAccuontWhapsappBusiness,
                nameProjectAppInMeta,  
                idProjectAppInMeta
            } = req.body;

            const veryaFilels =await  Verify.verificacionCamposRequeridos([
                credentialId ,                
                tokenAccesWhatsappClousdApi,
                phoneNumber,  
                idPhoneNumber,
                idAccuontWhapsappBusiness,
                nameProjectAppInMeta,  
                idProjectAppInMeta
            ]);

            if(!veryaFilels){
                let response = await ApiStantarResponse.jsonResponse(1, 'Error de validacion, complete los campos requeridos',[{                
                    credentialId:"",                
                    tokenAccesWhatsappClousdApi:"",
                    phoneNumber:"",  
                    idPhoneNumber:"",
                    idAccuontWhapsappBusiness:"",
                    nameProjectAppInMeta:"",  
                    idProjectAppInMeta:""
                }]);
                console.log('--(Crete credential ws-cl-api) Error registered credentials whatsapp api cloud api  --');
                return res.status(400).send(response);
            }


            const credentailData = await credentialWhatsappCloudApi.findById({_id:credentialId});
            if(!credentailData){
                let response = await ApiStantarResponse.jsonResponse(1,'Error de validacion, no se encontro ningun credentail para el credentailId',[])
                console.log('--(update credential ws-cl-api) Error de validacion, no se encontro ningun credentail para el credentailId  --');
                return res.status(400).send(response);
            }

            const exisCredentrial = await credentialWhatsappCloudApi.find({phoneNumber});
            if(exisCredentrial.length>1){
                let response = await ApiStantarResponse.jsonResponse(1,'Error de validacion, el numero de whatsapp ya fue registrado',[])
                console.log('-- (update credential ws-cl-api) Error de validacion, el numero de whatsapp ya fue registrado  --');
                return res.status(400).send(response);
            }

            const newCredential ={               
                tokenAccesWhatsappClousdApi,
                phoneNumber,  
                idPhoneNumber,
                idAccuontWhapsappBusiness,
                nameProjectAppInMeta,  
                idProjectAppInMeta
            };

            let result = await credentialWhatsappCloudApi.findOneAndUpdate({_id:credentialId},newCredential);
            console.log('-- (Update credential ws-cl-api): succces update credential successful --')
            let response = await ApiStantarResponse.jsonResponse(0,'Succesful, credencial actualizado exitosamente',[result]);
            return res.status(200).send(response)

        } catch (error) {
             let response = await ApiStantarResponse.jsonResponse(1,`Error, algo salio mal al actulizar los datos del credencial, error: ${error}`,[])
                console.log('--(update credential ws-cl-api) Error, algo salio mal al actulizar los datos del credencial --',error);
                return res.status(400).send(response);
        }
    }

}


module.exports = CredentialWhatsappApiCloud;