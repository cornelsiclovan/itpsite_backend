const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const contactSchema = new Schema({
    telefon: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Contact', contactSchema)