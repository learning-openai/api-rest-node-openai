'use strict'

const mongoose = require('mongoose');
const  { Schema } = mongoose;

const service = new Schema({
    name:String,
    description:String,
    price:Number,
    userId:{
        ref: 'user'
    },
    embedding:[],
    createdAt:{type:Date, default:Date.now},
    lastUpdate:{type:Date, default:Date.now}
})