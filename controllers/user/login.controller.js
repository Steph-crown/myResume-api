const User = require('../../models/user.model');
const bcrypt = require('bcrypt');


module.exports = function(req, res, next) {

    // Checks if the email and corresponding password is in the database
    User.findOne({
        email: req.body.email
    })
        .select('dashboard password')
            .exec((err, data) => {
                if (data) {

                    // compares req password with hashed password
                    bcrypt.compare(req.body.password, data.password, function(err, result) {
                        if (result) {
                            res.status(200).json({
                                status: 200,
                                data: data
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
                        error: "Email and password not found"
                    });
                };
            })
}

