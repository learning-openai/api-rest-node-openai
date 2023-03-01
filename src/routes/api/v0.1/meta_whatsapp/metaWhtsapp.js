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
        console.log(req)
        // res.status(200).send('reciceved data');
    }
}

module.exports = MetaWhatsapp;