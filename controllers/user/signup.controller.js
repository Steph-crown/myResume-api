const { json } = require('body-parser');
const User = require('../../models/users.model');
const UserDashboard = require('./../../models/dashboard.model')
const bcrypt = require('bcrypt');
const mailSender = require('./../../utilities/mail-sender')

// FOR BCRYPT HASHING
const SALT_ROUND = 10;

module.exports = function(req, res, next) {
    let newUser = new User(req.body);
    let newUserDashboard = new UserDashboard({
        email: req.body.email,
        dashboard: null
    })

    // Ensures email is in the database before saving signing the user up
    User.findOne({email: req.body.email})
        .exec((err, data) => {
            if (data) {
                res.status(400).json({
                    status: 400,
                    error: "Email Registered"
                })
            }else {
                

                // GENERATES SALT FOR HASHING
                bcrypt.genSalt(SALT_ROUND, function(err, salt) {

                    // HASHES PASSWORD
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) res.json(err);
                        else {
                            newUser.password = hash;

                            // Saves the user
                            newUser.save((err, data) => {
                                if (err) res.status(400).json(err);
                                else {
                                    res.status(200).json({
                                        status: 200,
                                        data: data
                                    });

                                    // Creates and saves a dashboard for the user
                                    newUserDashboard.save((err, data) => {
                                        if (err) res.status(400).json(err);
                                        else {
                                            res.status(200).json({
                                                status: 200,
                                                data: data
                                            });
                                        }
                                    })


                                    // Sends a mail to the sign up email.
                                    mailSender("This is a header", "this is body", function(err, data) {
                                        if (err) console.log(err);
                                        else console.log(data)
                                    })
                                }
                            })
                        }
                    });
                });
            };
        })
};







