const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
 
const serviceSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    currency: {
        type: String
    },
    image: {
        type: String
    }
}, {strict: false});

module.exports = mongoose.model('Service', serviceSchema)