const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const contactRoutes = require('./routes/contact-routes');
const serviceRoutes = require('./routes/service-routes');
const programRoutes = require('./routes/program-routes');
const itemRoutes    = require('./routes/item-routes');
const userRoutes    = require('./routes/user-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    
    next();
});

app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured!'})
});
let mongoose_uri='';
if (process.env.MONGODB_USER && process.env.MONGODB_USER.length > 0 && process.env.MONGODB_DATABASE && process.env.MONGODB_DATABASE.length > 0) {
    mongoose_uri=`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
} else {
    mongoose_uri=`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
}
mongoose.connect(mongoose_uri)
    .then(() => {
        console.log('Connected to MongoDB...');
        app.listen(5000);
    })
    .catch(err => console.error('Could not connect to MongoDb ...', err));