const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
 
const itemSchema = new Schema({
    service_name: {
        type: String,
    }
});


module.exports = mongoose.model('Item', itemSchema)