//Denne fil indeholder alle vores http verbs og agerer som controller til Booking
const mongoose = require('mongoose');
const Booking = require('../models/booking');

//[1]GET Finder alle booking i databasen
exports.bookings_get_all = (req, res, next) => {
    Booking.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//[2]GET Finder en specifik booking i databasen på baggrund af et Id
exports.bookings_get_booking = (req, res, next) => {
    const id = req.params.bookingId;
    Booking.findById(id)
        .exec()
        .then(doc => {
            console.log("(GET by Id) From booking database", doc);
            if (doc) {
                res.status(200).json(doc); //Booking fundet på baggrund af Id
            } else {
                res
                    .status(404) //Booking ikke fundet på baggrund af Id
                    .json({ message: "No valid entry user for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err }); //BookingId er ikke gyldigt
        });
};

//[3]POST Laver en booking
exports.bookings_post_booking = (req, res, next) => {
    const booking = new Booking({
        //Mongoose genererer selv et custom id til det man laver
        date: req.body.date,
        time: req.body.time,
        practitioner: req.body.practitioner,
        client: req.body.client,
        animal: req.body.string
    });
    booking
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: '(POST to bookings) Booking created',
                createdBooking: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:  err
            });
        });
};

//[4]PATCH Opdaterer en booking information
exports.bookings_patch_booking = (req, res, next) => {
    const id = req.params.bookingId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Booking.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//[5]DELETE Sletter en booking fra databasen
exports.bookings_delete_booking = (req, res, next) => {
    const id = req.params.bookingId;
    Booking.remove({_id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

//[6]POST Henter alle bookings på baggrund af ejerens id
exports.bookings_get_byUser = (req, res, next) => {
    Booking.find({client: req.body.userId})
        .exec()
        .then(bookings => {
            console.log(bookings);
            res.status(200).json(bookings);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//[7]POST Henter alle bookings på baggrund af ejerens id
exports.bookings_get_byPrac = (req, res, next) => {
    Booking.find({practitioner: req.body.userId})
        .exec()
        .then(bookings => {
            console.log(bookings);
            res.status(200).json(bookings);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
