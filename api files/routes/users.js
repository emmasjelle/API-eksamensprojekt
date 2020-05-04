const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');

//Henter vores user controller til vores routes fra ..\controllers\users.js
const usersController = require('../controllers/users');

//[1] Finder alle users i databasen
router.get("/", usersController.users_get_all);

//[2] Finder en specifik user i databasen på baggrund af et Id
router.post('/find', usersController.users_get_user);

//[3]POST Laver en user
router.post('/signup', usersController.users_post_user);

//[4]POST Log in
router.post('/login', usersController.users_login_user);

//[5]PATCH Opdaterer en users information
router.patch("/:userId", usersController.users_patch_user);

//[6]DELETE Sletter en bruger fra databasen
router.delete('/:userId', usersController.users_delete_user);

//[7]POST Check for admin
router.post('/check', usersController.users_check_user);

//[8]POST Check name for an id
router.post('/checkName', usersController.users_check_name);


module.exports = router;
