//Starer express og håndterer requests i vores server
//Indeholder stierne vi bruger i serveren
//Her initialiseres express som en funktion, og gør at vi kan bruge
//dets methods(funktionalitet)
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookingRoutes = require('./api files/routes/booking');
const userRoutes = require('./api files/routes/users');
const animalRoutes = require('./api files/routes/animals');
//Passwordet til databasen er hardcoded i nodemon.json
mongoose.connect('mongodb+srv://Hartvig1337:' +
    process.env.MONGO_ATLAS_PW +
    '@eksamensprojekt-api-5tszk.mongodb.net/test?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Se video 4 om hvordan headers virker og hvorfor
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers",
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next()
});
//Fungerer som middleware.
//Eksempel: requests som starter med /booking bliver filtreret og
//forwarded til booking.js
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);
app.use('/animals', animalRoutes);
//Error handling:
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;
