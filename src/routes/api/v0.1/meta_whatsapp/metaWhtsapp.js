// token de verififcaion de se coloco en meta developer
// TOKEN OF VERIFY: tokenVerifyapinode

const tokenVerify = "tokenVerifyapinode"

class MetaWhatsapp{
    static async verifyTokenMeta(req, res, next){

        console.log('----verify token--- ')
        console.log(req)
        console.log(req?.headers)

        console.log('----hub-challenge---')
        const hudchallenge = req?.query['hub.challenge']
        console.log(hudchallenge)
        // res.status(200).send(req.headers.authorization.split(' ')[1])
        // /metawhatsapp?hub.mode=subscribe&hub.challenge=1108383849&hub.verify_token=tokenVerifyapinode
        res.status(200).send(hudchallenge)
    }


    // recive data from meta-wwhatsapp
    static async receiveMetaWhatsappData(req, res, next){

        console.log('--- post received data meta ---')
        // console.log(req)
        // -los datos vieneen en el body --> req.body
        // body: { object: 'whatsapp_business_account', entry: [ [Object] ] },...
        
        const data = req?.body;
        const phoneNumberClient = data["entry"][0]["changes"][0]["value"]["messages"][0]["from"]
        const message = data["entry"][0]["changes"][0]["value"]["messages"][0]["text"]["body"]
        const idWAMessage = data["entry"][0]["changes"][0]["value"]["messages"][0]["id"]
        const timestamp = data["entry"][0]["changes"][0]["value"]["messages"][0]["timestamp"]

        console.log({
            phoneNumberClient,
            message,
            idWAMessage,
            timestamp
        })

        res.status(200).send({status:"success"})

        // res.status(200).send('reciceved data');
    }
}

module.exports = MetaWhatsapp;