'use strict'

class ApiStantarResponse{
    static fecha = new Date();
   

    static async jsonResponse(  code=0, message="Message default", data=[] ){

        // this.fecha.toISOString()
        const responseJ = {
            status: code,
            timestamp:this.fecha.toISOString(),
            message: message,
            data:data
        }

        return responseJ;
    }
}

module.exports = ApiStantarResponse;