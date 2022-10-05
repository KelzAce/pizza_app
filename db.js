const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL
function ConnectToMongoDB(){
    mongoose.connect(MONGO_DB_CONNECTION_URL);

    mongoose.connection.on('connected', ()=>{
        console.log('connected to mongodb successfully')
    })

    mongoose.connection.on('error', (err)=>{
        console.log('An error occured')
    })
}

module.exports = {ConnectToMongoDB}