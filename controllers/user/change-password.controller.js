const User = require('../../models/users.model');
const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
const mailSender = require('../../utilities/mail-sender')




module.exports = function(req, res, next) {

    // Checks if the email and corresponding password is in the database
    User.findOne({
        email: req.body.email
    })
        .select('password')
            .exec((err, data) => {
                if (data) {

                    // compares req password with hashed password
                    bcrypt.compare(req.body.password, data.password, function(err, result) {
                        if (result) {

                            // GENERATES SALT FOR HASHING
                            bcrypt.genSalt(SALT_ROUND, function(err, salt) {

                                // HASHES NEW PASSWORD
                                bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                                    if (err) res.json(err);
                                    else {
                                        let filter = {email: req.body.email};
                                        let update = {password: hash};
                                        let options = {new: true};

                                        // Updates user password to the new password
                                        User.findOneAndUpdate(filter, update, options, (err, data) => {
                                            if (data) {

                                                // Sends a mail to the sign up email.
                                                mailSender("Password Reset", "<b>Your password was just reset to req.body.newPassword</b>")
                                                res.status(200).json({
                                                    status: 200,
                                                    data: data
                                                })
                                            }else {
                                                res.status(400).json({
                                                    status: 400,
                                                    error: err
                                                })
                                            };
                                        })

                                    }
                                });
                            });
                        }
                        // If password is wrong
                        else  {
                            res.json({
                                status: 400,
                                error: "Wrong password. Forgotten Password?"
                            });
                        };
                    });
                }
                // If error in finding email
                else {
                    res.status(400).json({
                        status: 400,
                        error: "Email and password not found"
                    });
                };
            })
}

