'use strict'

const ApiStantarResponse = require("../../utils/standardResponse/standardApiResponse");
const Verify = require("../../utils/verifyCampos/verifyCampos");

const userModel = require('../../../../../database/model/user.model')

class UserController{

    static async signUp(req, res, next){

        try {
            const {  name , lastName , email , password , specialty, age, phoneNumber, areaCode  }  = req.body;

            const verifyCampos =  await Verify.verificacionCamposRequeridos([name , lastName , email , password, phoneNumber, areaCode]);
            if(!verifyCampos){
                var response = await ApiStantarResponse.jsonResponse(1, 'Error de validación: Complete los campos requeridos',[]);
                return res.status(400).send(response);
            }
    
            const existUser =await  userModel.user.findOne({email})
            if(existUser){
                console.log('--- El email ya fue registrado ---')
                console.log(existUser)
                var response = await ApiStantarResponse.jsonResponse(1,'Error el usuario ya existe, el email ya fue registrado', [])
               return res.status(300).send(response)
            }
    
            var newUser = new userModel.user({
                name:name,
                lastName:lastName,
                email:email,
                password:password,
                specialty:specialty,
                age:age,
                phoneNumber:phoneNumber,
                areaCode:areaCode,
                slugPhoneNumber:`${areaCode}${phoneNumber}`,
            })
    
            var response = await newUser.save();
            console.log('--- Registered user ok----')
    
            var resJson = await ApiStantarResponse.jsonResponse(0,'succesfull, created user',[])
            return res.status(200).send(resJson)

        } catch (error) {
            console.log('Error created user');
            console.log(error);
            var response = await ApiStantarResponse.jsonResponse(1,'error creating a new user',[]);
            return res.status(400).send(response)
        }
    }


    static async signIn(req, res, next){

        try {
            const { email, password } = req.body;

            const verifyCompos = await Verify.verificacionCamposRequeridos([email, password]);
            if(!verifyCompos){
                var response = await ApiStantarResponse.jsonResponse(1, 'Error de validación: Complete los campos requeridos',[]);
                return res.status(400).send(response);
            }
    
            const userData = await userModel.user.findOne({email});

            if(!userData){
                console.log('--El usuario no existe--')
                var response = await ApiStantarResponse.jsonResponse(1, 'Error de inicio de session: el usuario no existe',[]);
                return res.status(400).send(response);
            }
    
            if(userData?.password != password){
                console.log('--El usuario no existe, password incorrecto--')
                var response = await ApiStantarResponse.jsonResponse(1, 'Error de inicio de session: contraseña incorrecta',[]);
                return res.status(400).send(response);
            }
    
            if(userData?.password === password){
                var dataU = {
                    name: userData?.name,
                    lastName: userData?.lastName,
                    phoneNumber: userData?.phoneNumber,
                    slugPhoneNumber:userData.slugPhoneNumber,
                    areaCode: userData?.areaCode,
                    email: userData?.email
                }
    
                var response = await ApiStantarResponse.jsonResponse(0, 'succesfull, inicio de session', [dataU]);
                return res.status(200).send(response)
            }
        } catch (error) {
            console.log('Error login - signin');
            console.log(error);
            var response = await ApiStantarResponse.jsonResponse(1,'Error login - signin',[]);
            return res.status(400).send(response)
        }
        
    }

    static async update(req, res, next){

       try {
        const {userId} = req.body;

        const verifyCompos = await Verify.verificacionCamposRequeridos([userId]);
        const longId = userId.length;
        // console.log(longId)
        if(!verifyCompos || longId!=24){
            var response = await ApiStantarResponse.jsonResponse(1, 'Error de validación: el id de usuario es requerido',[]);
            return res.status(400).send(response);
        }


        const user = await userModel.user.findOne({_id:userId})

        console.log(user)

        const userData = {
            name: req.body?.name!='' && req.body.name!= undefined? req.body?.name:user.name,
            lastName: req.body?.lastName!='' && req.body.lastName!=undefined? req.body?.lastName:user.lastName,
            email: req.body?.email!='' && req.body.email!=undefined? req.body?.email:user.email,
            password: req.body?.password!='' && req.body.password!=undefined? req.body?.password:user.password,
            specialty:req.body?.specialty!='' && req.body.specialty!=undefined? req.body?.specialty:user.specialty,
            age:req.body?.age!='' && req.body.age!=undefined? req.body?.age:user.age,
            phoneNumber:req.body?.phoneNumber!='' && req.body.phoneNumber!=undefined? req.body?.phoneNumber:user.phoneNumber,
            areaCode:req.body?.areaCode!='' && req.body.areaCode!=undefined? req.body?.areaCode:user.areaCode,
            slugPhoneNumber:`${req.body?.areaCode!='' && req.body.areaCode!=undefined? req.body?.areaCode:user.areaCode}${req.body?.phoneNumber!='' && req.body.phoneNumber!=undefined? req.body?.phoneNumber:user.phoneNumber}`,
            lastUpdate:Date.now()
        }

        const updateUser = await userModel.user.findByIdAndUpdate({_id:user._id},userData)
        var response =await  ApiStantarResponse.jsonResponse(0,'Actualizacion: se actualizaron los datos correctamente',[])
        return res.status(200).send(response)

       } catch (error) {
            console.log('Error update - update');
            console.log(error);
            var response = await ApiStantarResponse.jsonResponse(1,'Error al actualizar, error al actualizar los datos',[]);
            return res.status(400).send(response)
       }
    }
}


module.exports = UserController