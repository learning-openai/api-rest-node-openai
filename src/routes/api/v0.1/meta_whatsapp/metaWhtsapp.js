// token de verififcaion de se coloco en meta developer
// TOKEN OF VERIFY: tokenVerifyapinode

const tokenVerify = "tokenVerifyapinode"

class MetaWhatsapp{
    static async verifyTokenMeta(req, res, next){

        console.log('----verify token--- ')
        // console.log(req?.headers)

        // res.status(200).send(req.headers.authorization.split(' ')[1])
        res.status(200).send(tokenVerify)
    }
}

module.exports = MetaWhatsapp;