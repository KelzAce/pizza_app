const express = require('express');
const {ConnectToMongoDB} = require('./db.js');
require('dotenv').config()

const bookRoute = require ("./Route/book")

// Making changes so that we can make a pull request

const PORT = process.env.PORT;

const app = express(); 

app.use(express.json())
app.use('/books', bookRoute)

// connecting to mongodb instance
ConnectToMongoDB();

app.get('/', (req, res)=>{
    res.send("Welcome Home")
})

app.listen(PORT, () => {
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})