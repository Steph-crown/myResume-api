const User = require('../../models/user.model');
const bcrypt = require('bcrypt');

module.exports = function(req, res, next) {

    User.findOne({email: req.body.email}, (err, data) =>{
        if (data) {
            // compares req password with hashed password
            bcrypt.compare(req.body.password, data.password, function(err, result) {
                if (result) {

                    // deletes the user
                    User.deleteOne({
                        email: req.body.email,
                        password: data.password
                    }, function(err, data) {
                        if (data) {
                            res.json(data);
                        }else {
                            res.json(err)
                        };
                    })
                }else {
                    res.json(err);
                }
            })
        }else {
            res.json(err);
        }
    })
}