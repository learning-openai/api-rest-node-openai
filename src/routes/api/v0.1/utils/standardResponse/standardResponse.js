'use strict'


class StandardResponse{

    static ok = 'successful';
    static error = 'error';


    static successfulResp(message='success', data=[]){
        const response = {
            ok: this.ok,
            message: message,
            data: data
        }
        return response;
    }

    static errorResp(message='error executed function', data=[]){
        const response = {
            error: this.error,
            message: message,
            data: data
        }
        return response;
    } 

}

module.exports = StandardResponse;