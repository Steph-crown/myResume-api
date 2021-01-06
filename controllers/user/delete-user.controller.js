const User = require('../../models/users.model');
const UserDashboard = require('./../../models/dashboard.model');

const bcrypt = require('bcrypt');

module.exports = function(req, res, next) {

    let email = {email: req.body.email};

    // Finds the user
    User.findOne(email, (err, data) =>{
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

                            // Finds the user's dashboard and deletes
                            UserDashboard.findOneAndDelete(email, (err, data) => {
                                if (err) res.json(err); 
                                else res.json(data);
                            });
                
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