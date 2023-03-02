'use strict'

class ApiStantarResponse{
    static fecha = new Date();
   

    static async jsonResponse(  code=0, message="Message default", data=[] ){

        // this.fecha.toISOString()
        const responseJ = {
            code: code,
            date:this.fecha.toLocaleString(),
            message: message,
            data:data
        }

        return responseJ;
    }
}

module.exports = ApiStantarResponse;