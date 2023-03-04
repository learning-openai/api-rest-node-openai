'use strcit'
const mongoose = require('mongoose');

const {Schema} = mongoose;

const Product = new Schema({

})


const product = mongoose.model('product', Product);

module.exports = {
    product
}