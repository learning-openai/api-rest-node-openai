// imortando de la liberia de Openai
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}) 

// importando de la liberia de mathjs
const math = require('mathjs');
const PromptsServices = require('./modelsPrompts/promptsServices');



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


    // create completation for services
    static async createCompletationService(objectMessagesServices){
        const {    
        title,
        state,
        similarity,
        precio,
        userQuestion,
        description,
        urlResource,
        location } = objectMessagesServices

        // var prompt = `Imagina que eres una asistente de una clínica dental y debes generar una respuesta en base a la siguiente pregunta: "${userQuestion}". 
        // Utiliza solo los datos que sean necesarios para responder la pregunta. 
        // Datos: servicio "${title}".  ${precio>0?"precio"+' ' +precio +' '+'Bs.':''}  descripcion "${description}". "${location!=''?'direccion'+' '+ location:''}".`;
        console.log(':::::::::::::::::::::::::::::::::::::::::::::::::......lllllllllllllll');
        console.log(objectMessagesServices);
        var prompt;
        if(state === true){
            console.log('-------------- true');
             prompt = await PromptsServices.switchPprompst('',objectMessagesServices);
             console.log(prompt)
        }
        if(state === false){
            console.log('-------------- false');
            prompt = await PromptsServices.switchPprompst(state, objectMessagesServices);
             console.log(prompt)
        }
        if(title === ''){
            console.log('-------------- vacio ');
            prompt = await PromptsServices.switchPprompst('justQuestion', objectMessagesServices);
             console.log(prompt)
        }

        

        // const prompt = `Hola, soy un asistente de la clínica dental ${clinicName}. 
        // ¿En qué puedo ayudarte con respecto al servicio 
        // ${title}? 
        // ${description !== '' ? `Una breve descripción del servicio es: "${description}". ` : ''}
        // ${precio > 0 ? `El precio del servicio es de ${precio} Bs. ` : ''}
        // ${location !== '' ? `Estamos ubicados en ${location}. ` : ''}
        // Por favor, dime en qué puedo ayudarte con respecto a este servicio.`;


        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 125,
            temperature: 0.1,
            echo:false, 

            // stop: "\n"

        })

        // var onlyText = await response?.data?.choices[0]?.text?.replace(/^[^\n]*\n/, "")
        // console.log(onlyText)
        console.log(response.data.choices)
        return response.data.choices
    }

    // search embedding for products
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
                    state:listEmbeddings[i].state,
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


    // search embedding for services
     static async SearchEmbeddingServices( messageClient, listEmbeddings ){
        
        const embeddingText = await this.createEmbedding(messageClient);
        console.log('search embedding');
        console.log(embeddingText);
        
        const listSimilaties=[];
        for ( var i=0; i < listEmbeddings.length; i++ ) {

            let dotProduct = await math.dot( embeddingText, listEmbeddings[i].embeddingTitle );
            // let norm1 = math.norm(embeddingTet) 
            // let norm2 = math.norm(listEmbeddings[i].embedding) 
            // let similarity = dotProduct/(norm1*norm2)
            console.log(dotProduct)
            if(dotProduct>0.80){
                console.log(listEmbeddings[i]?.title);
                listSimilaties.push({
                    title:listEmbeddings[i]?.title,
                    state:listEmbeddings[i]?.state,
                    similarity:dotProduct,
                    precio:listEmbeddings[i]?.price,
                    userQuestion: messageClient,
                    description: listEmbeddings[i]?.description,
                    urlResource: listEmbeddings[i]?.urlResource,
                    location: listEmbeddings[i]?.location,
                })
            }

            console.log('-----------search ------------------');
            console.log(listEmbeddings);

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