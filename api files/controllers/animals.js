//Denne fil indeholder alle vores http verbs og agerer som controller til animals
const mongoose = require('mongoose');
const Animal = require('../models/animals');

//[1]GET Finder alle animals i databasen
exports.animals_get_all = (req, res, next) => {
    Animal.find()
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

//[2]GET Finder et specifik animal i databasen på baggrund af et Id
exports.animals_get_animal = (req, res, next) => {
    const id = req.params.animalId;
    Animal.findById(id)
        .exec()
        .then(doc => {
            console.log("(GET by Id) From animal database", doc);
            if (doc) {
                res.status(200).json(doc); //Animal fundet på baggrund af Id
            } else {
                res
                    .status(404) //Animal ikke fundet på baggrund af Id
                    .json({ message: "No valid entry animal for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err }); //AnimalId er ikke gyldigt
        });
};

//[3]POST Laver et animal
//Skal rettes så at den henter (ligesom navbar admin check) brugerens id
exports.animal_post_animal = (req, res, next) => {
    const animal = new Animal({
        //Mongoose genererer selv et custom id til det man laver
        type: req.body.type,
        race: req.body.race,
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        owner: req.body.owner
    });
    animal
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: '(POST to animals) Animal created',
                createdAnimal: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:  err
            });
        });
};

//[4]PATCH Opdaterer en animals information
exports.animals_patch_animal = (req, res, next) => {
    const id = req.params.animalId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Animal.update({ _id: id }, { $set: updateOps })
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

//[5]DELETE Sletter et animal fra databasen
exports.animals_delete_animal = (req, res, next) => {
    const id = req.params.animalId;
    Animal.remove({_id: id })
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

//[6]POST Henter alle dyr på baggrund af ejerens id
exports.animals_post_byUser = (req, res, next) => {
    Animal.find({owner: req.body.userId})
        .exec()
        .then(animals => {
            console.log(animals);
            res.status(200).json(animals);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
