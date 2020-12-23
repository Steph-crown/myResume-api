const User = require('../../models/user.model');

module.exports = function (req, res, next) {
    let filter = {email: req.body.email};
    let update = {dashboard: req.body.dashboard};
    let options = {new: true};
    User.findOneAndUpdate(filter, update, options, (err, data) => {
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
}
