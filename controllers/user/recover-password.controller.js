const User = require('./../../models/user.model');
const generatePassword = require('./../../utilities/password-generator')
const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
const mailSender = require('./../../utilities/mail-sender');


module.exports = function (req, res, next) {
    User.findOne({email: req.body.email}, (err, data) => {
        if (data) {

            // Generates a new 16 character password
            let newPassword = generatePassword.generate(16);

            // GENERATES SALT FOR HASHING
            bcrypt.genSalt(SALT_ROUND, function(err, salt) {

                // HASHES PASSWORD
                bcrypt.hash(newPassword, salt, function(err, hash) {
                    if (err) {
                        res.json(err)
                    }else {
                        let filter = {email: req.body.email};
                        let update = {password: hash};
                        let options = {new: true};

                        // Finds user email and updates the password to new generated password
                        User.findOneAndUpdate(filter, update, options, (err, data) => {
                            if (data) {
                                // Sends a mail to the sign up email.
                                mailSender("This is a your new password", newPassword, function(err, data) {
                                    if (err) console.log(err);
                                    else console.log(data)
                                });
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
                        });
                    }
                })
            // res.json()
            });
        }
    })
}