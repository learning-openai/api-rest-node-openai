// configuration twio
const accountSid  = process.env.TWILIO_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken)


class TwilioServer{

    static async sendWhatsappMessage(stringMessage='this a twilio message'){
       const response = await client.messages.create({
                            body: 'hellos from twilio - server node ', 
                            from: 'whatsapp:+14155238886',       
                            to: 'whatsapp:+59169651053' 
                        });

        console.log(response)
        
    }

}



module.exports =  TwilioServer;
