const UserDashboard = require('../../models/dashboard.model');
const User = require('./../../models/users.model');

module.exports = function (req, res, next) {
    let email = {email: req.body.email};
    let update = {dashboard: req.body.dashboard};
    let options = {new: true, useAndModify: true};

    // Finds the user email in Users schema
    User.findOne(email).exec((err, data) => {
        if (data) {

            // Gets and updates that user's dashboard
            UserDashboard.findOneAndUpdate(email, update, options, (err, data) => {
                if (data) {
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
        }else {
            res.status(400).json({
                status: 400,
                error: "Email not found"
            })
        }
    })
    
}
