const express = require('express')

const Address = require('./models/model')

const bodyParser = require('body-parser')

const app = express();

const connectionStr = 'mongodb+srv://jlugo:xbox2701@cluster0.mme34.mongodb.net/address-book?retryWrites=true&w=majority'

const mongoose = require('mongoose')

app.use( bodyParser.urlencoded( { extended: false } ) )

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

mongoose
.connect( connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    console.log("Connected To DB")
})
.catch( error => {
    console.error(error)
})

// Create
app.post( '/register', (req,res) => {
    name= req.body.name
    email= req.body.email
    phone= req.body.phone
    place= req.body.place

    let newAddress = new Address({
        name: name,
        email: email,
        phone: phone,
        place: place
    })

    newAddress.save()
    .then( address => {res.send(address)})
    .catch( error => {console.error(error)})
})

// Read
app.get('/:id', (req,res) => {
    Address.findById( req.params.id, address => {
        res.send(address)
    })
    .catch( error => {console.error(error)})
})

// Update
app.put('/update/:id', (req,res) => {
    let address = {}
    if(req.body.name) address.name = req.body.name
    if(req.body.email) address.email = req.body.email
    if(req.body.phone) address.phone = req.body.phone
    if(req.body.place) address.place = req.body.place

    // MongoDb setting the update
    address = {$set: address}

    Address.update({_id: req.params.id}, address)
    .then( () => {res.send(address)})
    .catch( error => {console.error(error)})
})

app.delete('/delete/:id', (req,res) => {
    Address.remove({_id: req.params.id})
    .then( res.send("User Deleted") )
    .catch( error => {console.error(error)})
})




