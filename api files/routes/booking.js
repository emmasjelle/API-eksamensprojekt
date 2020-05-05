const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/booking');

//Henter vores booking controller til vores routes fra ..\controllers\booking.js
const bookingController = require('../controllers/booking');

//[1] Finder alle bookings i databasen
router.get("/", bookingController.bookings_get_all);

//[2] Finder en specifik booking i databasen på baggrund af et Id
router.get('/getById', bookingController.bookings_get_booking);

//[3]POST Laver en booking
router.post('/create', bookingController.bookings_post_booking);

//[4]PATCH Opdaterer en users information
router.patch('/:bookingId', bookingController.bookings_patch_booking);

//[5]DELETE Sletter en booking fra databasen
router.delete('/:bookingId', bookingController.bookings_delete_booking);

//[6]POST Henter alle bookings på baggrund af ejerens id
router.post('/getByUser', bookingController.bookings_get_byUser);


module.exports = router;
