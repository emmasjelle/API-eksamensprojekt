const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Henter vores animals controller til vores routes fra ..\controllers\users.js
const animalsController = require('../controllers/animals');

//[1] Finder alle animals i databasen
router.get("/", animalsController.animals_get_all);

//[2] Finder en specifik animal i databasen på baggrund af et Id
router.get('/:animalId', animalsController.animals_get_animal);

//[3]POST Laver et animal
router.post('/create', animalsController.animal_post_animal);

//[4]PATCH Opdaterer en animals information
router.patch("/:animalId", animalsController.animals_patch_animal);

//[5]DELETE Sletter en animal fra databasen
router.delete('/:animalId', animalsController.animals_delete_animal);

//[6]POST Henter alle dyr på baggrund af ejerens id
router.post('/getByOwner', animalsController.animals_post_byUser);

module.exports = router;
