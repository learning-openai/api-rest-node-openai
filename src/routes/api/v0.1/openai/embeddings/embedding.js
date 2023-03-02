// imortando de la liberia de Openai
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}) 

// importando de la liberia de mathjs
const math = require('mathjs');



class Embeddings{

    // function que recibe un texto y debulve un embeddin utilizando openai
    static async createEmbedding(stringText='Tex example'){
        
        try {
            const openai = new OpenAIApi(configuration);

            const response = await openai.createEmbedding({
                model: "text-embedding-ada-002",
                input: stringText,
            });
            
            console.log(response.data);
            console.log(response.data.data);
             
            
            return response.data.data[0].embedding;

        } catch (error) {
            console.log(`Error class embedding.createEmbedding(): ${error}`);
            return ['error al genear el embedding']
        }
    }


    static async createCompletation(objectProduct){
        const {name,precio, marca, talla,userQuestion} = objectProduct

        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `genear un respuesta corta utilizando neuroventas en base la siguiente :${userQuestion}: con los siguientes datos: nombre prducto "${name}", precion en Bs:${precio} , marca:${marca}, talla:${talla}`,
            max_tokens: 250,
            temperature: 0,
        })

        console.log(response.data.choices)
        return response.data.choices
    }

    static async seachEmbeddingData(stringText, listEmbeddings){
        
        const embeddingText = await this.createEmbedding(stringText);
        console.log('search embedding');
        console.log(embeddingText);
        
        const listSimilaties=[];
        for (var i=0; i<listEmbeddings.length;i++) {

            let dotProduct = await math.dot(embeddingText, listEmbeddings[i].embedding);
            // let norm1 = math.norm(embeddingTet) 
            // let norm2 = math.norm(listEmbeddings[i].embedding) 
            // let similarity = dotProduct/(norm1*norm2)
            console.log(dotProduct)
            if(dotProduct>0.80){
                console.log(listEmbeddings[i].name);
                listSimilaties.push({
                    name:listEmbeddings[i].name,
                    similarity:dotProduct,
                    precio:listEmbeddings[i].precio,
                    marca:listEmbeddings[i].marca,
                    talla:listEmbeddings[i].talla,
                    userQuestion: stringText
                })
            }
            // [1,2,3] [2,1,3] 
            
            for(var j=0;j<listSimilaties.length;j++){
                console.log('this a for')
                let i=j;
                while(listSimilaties[i]?.similarity<listSimilaties[i+1]?.similarity && i>=0){
                    console.log('this in while')
                    var aux=listSimilaties[i];
                    listSimilaties[i]=listSimilaties[i+1]
                    listSimilaties[i+1]=aux;
                    console.table(listSimilaties[i])
                    i--;
                }
            }
            console.log(listSimilaties)
            // return embeddingTet;
        }


        return listSimilaties;

    }
}




module.exports = Embeddings;    