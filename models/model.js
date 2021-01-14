const mongoose = require('mongoose')

const addresSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    place: {
        type: String,
    }
})
// Creating Collection Address
const Address = mongoose.model('Address', addresSchema)

module.exports = Address