'use strict'



class PromptsServices{


    static async switchPprompst(someParameterString , objectMessagesServices ){

        console.log('ññññññññññññññññññññññññññññññññññññññññññññññ')
        const {    
            title,
            state,
            similarity,
            precio,
            userQuestion,
            description,
            urlResource,
            location } = objectMessagesServices
        
        const keyParameter = someParameterString?.toString() 

        switch (keyParameter) {
            // cuando el stado esta dasactivado state=false pero si existe el embedding
            case 'false':
                var prompt = `Imagina que eres una asistente de una clínica dental y debes generar una respuesta negativa en base a la siguiente pregunta: "${userQuestion}". 
                y responder en relacion al titulo: "${title}", indicando de que temporalmente no prestamos dicho servicio, sin embargo nuestra clinica presta servicios dentales`;
                return prompt;

            // cundo no se encontron ningun embedding
            case 'justQuestion':
                var prompt = `Imagina que eres una asistente de una clínica dental y debes generar una respuesta negativa en base a la siguiente pregunta: "${userQuestion}".
                si la pregunta no tiene sentido indicale que solo ofresemos servicios dentales`;
                
                return prompt;
        
            default:
                var prompt = `Imagina que eres una asistente de una clínica dental y debes generar una respuesta en base a la siguiente pregunta: "${userQuestion}". 
                Utiliza solo los datos que sean necesarios para responder la pregunta. 
                Datos: servicio "${title}".  ${precio>0?"precio"+' ' +precio +' '+'Bs.':''}  descripcion "${description}". "${location!=''?'direccion'+' '+ location:''}".`;
                
                return prompt
        }
    }
}


module.exports = PromptsServices;