const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
 
const programSchema = new Schema({
    tip_program: {
        type: String,
    },
    deschidere: {
        type: String
    }, 
    inchidere: {
        type: String
    }
});


module.exports = mongoose.model('Program', programSchema)