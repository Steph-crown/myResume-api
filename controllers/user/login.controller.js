const User = require('../../models/users.model');
const UserDashboard = require('./../../models/dashboard.model');
const bcrypt = require('bcrypt');


module.exports = function(req, res, next) {
    let email = {email: req.body.email};
    // Checks if the email and corresponding password is in the database
    User.findOne(email)
        .select('password')
            .exec((err, data) => {
                if (data) {

                    // compares req password with hashed password
                    bcrypt.compare(req.body.password, data.password, function(err, result) {
                        if (result) {

                            // Fetches the user's dashboard
                            UserDashboard.findOne(email).exec((err, data) => {
                                if (err) {
                                    res.json({
                                        status: 400,
                                        error: "Error getting Dashboard"
                                    });
                                }else {
                                    res.status(200).json({
                                        status: 200,
                                        data: data
                                    })
                                }
                            })
                        }else  {
                            res.json({
                                status: 400,
                                error: "Wrong password. Forgotten Password?"
                            });
                        };
                    });
                }else {
                    res.status(400).json({
                        status: 400,
                        error: "Email not found"
                    });
                };
            })
}

