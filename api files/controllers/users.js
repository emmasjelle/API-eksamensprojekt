//Denne fil indeholder alle vores http verbs og agerer som controller til Users
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jToken = require('jsonwebtoken');

//[1]GET Finder alle users i databasen
exports.users_get_all = (req, res, next) => {
    User.find()
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

//[2]POST Finder en specifik user i databasen på baggrund af et Id
exports.users_get_user = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("(GET by Id) From booking database", doc);
            if (doc) {
                res.status(200).json({
                    name: docs[0].name
                })

            } else {
                res
                    .status(404) //Booking ikke fundet på baggrund af Id
                    .json({ message: "No valid entry booking for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err }); //BookingId er ikke gyldigt
        });
};

//[3]POST Laver en user
exports.users_post_user = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            }
            if (req.body.name.length < 2) {
                return res.status(409).json({
                    message: "No name entered"
                })
            }
            if (req.body.email.indexOf('@') === -1) {
                return res.status(409).json({
                    message: "Unvalid e-mail entered"
                })
            }
            if (req.body.password.length <= 7) {
                return res.status(409).json({
                    message: "Password must be longer than 7 characters"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            message: 'Hash failed'
                        });
                    } else {
                        const user = new User({
                            password: hash,
                            name: req.body.name,
                            address: req.body.address,
                            phoneNumber: req.body.phoneNumber,
                            email: req.body.email,
                            practitioner: req.body.practitioner,
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "(POST to users) User created",
                                    createdUser: result
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                    message: 'catch - failed'
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            });
        });
};

//[4]POST Log in
exports.users_login_user = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ //401 = unauthorized
                    message: 'Email eller brugernavn er forkert'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, valid) => {
                if (err) {
                    return res.status(401).json({ //401 = unauthorized
                        message: 'Email eller brugernavn er forkert'
                    });
                }
                if (valid) {
                    const token = jToken.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, process.env.Jtoken_Key,
                        {
                            expiresIn:60*30
                        }
                    );
                    return res.status(200).json({
                        message: 'Email og brugernavn match',
                        token: token,
                        email: user[0].email
                    });
                }
                res.status(401).json({ //401 = unauthorized
                    message: 'Email eller brugernavn er forkert'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//[5]PATCH Opdaterer en users information
exports.users_patch_user = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
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

//[6]DELETE Sletter en user fra databasen
exports.users_delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id })
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

//[7]POST Check for prac status
exports.users_check_user = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            res.status(200).json({
                practitioner: user[0].practitioner,
                id: user[0]._id
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//[8]POST converts id into name
exports.users_check_name = (req, res, next) => {
    User.find({id: req.body.id})
        .exec()
        .then(user => {
            res.status(200).json({
                name: user[0].name,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
