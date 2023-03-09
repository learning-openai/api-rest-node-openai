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
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})


const product = mongoose.model('product', Product);

module.exports = {
    product
}