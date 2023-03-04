const Embeddings = require("./embedding")


// import data
const DATA_EMBEDDINGS = require('./data.js')


class IndexEmbedding{


    static async generaEmbedding(req, res){

        const textExample = req.params?.text ? req.params?.text : 'Botas de cuero'
        const resultEmbedding = await  Embeddings.createEmbedding(textExample);

        res.status(200).send({embedding:resultEmbedding});
    }

    static async searchEmbedding(req, res){
        const {word} = req.params
        console.log(word)
        const data =await Embeddings.seachEmbeddingData(word ,DATA_EMBEDDINGS);
        const dataCompletation = await Embeddings.createCompletation(data[0])
        res.status(200).send(dataCompletation)
    }


}



module.exports = IndexEmbedding