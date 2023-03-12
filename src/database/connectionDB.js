'use strcit'

const mongoose = require('mongoose');

// const URL = "mongodb://localhost:27017/chatbotWhatsappDB";
const URL = "mongodb+srv://gonis1990:bt7wnSTCpNzWKA5q@cluster0.yk5nv95.mongodb.net/?retryWrites=true&w=majority"

const connectionDB=async(number=1)=>{
    

  try {
    await mongoose.set('strictQuery',false)
    await mongoose.connect(URL,{ useNewUrlParser:true})
    
    console.log('Connection database successful')
  } catch (error) {
    if(number>3){
        console.log('Error connect DB')
        return;
    }
    console.log(error)
    console.log(`Trying to connect again ...${number}`)
    return connectionDB(number+1); 
    
  }

}

connectionDB()