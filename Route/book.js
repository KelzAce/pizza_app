const express = require('express');
const bookModel = require('../model/book')

const bookRoute = express.Router();

bookRoute.get ('/', (req, res) => {
    bookModel.find({})
    .then((books) =>{
        res.status(200).send(books)
    }).catch((err) =>{
        console.log(err)
        res.status(500).send(err.message)
    })
})

bookRoute.get ('/:id', (req, res) => {
    const ID = req.params.id
    console.log(`getting book with Id: ${ID}`)

    // find and return book in the database
    res.send('get Book by id')
})

// create
bookRoute.post ('/', (req, res) => {
    const book = req.body
    bookModel.create(book)
        .then((book) => {
            res.status(201).json({
                message: 'Book added successfully',
                data: book
            })
            }).catch((err)  =>{
                res.status(400).send(err)
        })
})

// Update
bookRoute.post ('/:id', (req, res) => {
    const ID = req.params.id
    bookModel.findById(ID)
     .then((book) => {
        res.status(200).json({
            
        })



// delete
bookRoute.delete ('/:id', (req, res) => {
    const ID = req.params.id
    console.log(`deleting with Id: ${ID}`)

    // Perform delete to book in the database
    res.send('Books deleted')
})

module.exports = bookRoute