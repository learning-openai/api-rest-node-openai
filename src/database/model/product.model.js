'use strcit'
const mongoose = require('mongoose');

const {Schema} = mongoose;

const Product = new Schema({
    name:String,
    price:Number,
    barnd:String,
    stock:Number,
    color:String,
    category:String,
    description:String,
    embedding:[],
})


const product = mongoose.model('product', Product);

module.exports = {
    product
}