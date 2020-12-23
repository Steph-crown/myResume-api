var pdf = require('html-pdf');
const template = require('./../../documents')

module.exports = function (req, res, next) {
    pdf.create(template(req.body), {})
        .toFile('controllers/generate/result.pdf', (err)=> {
            if (err) {
                res.send(Promise.reject());
                console.log(err)
            }else {
                res.send(Promise.resolve());
                console.log(78)
            }
        })
}