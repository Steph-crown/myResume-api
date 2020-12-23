module.exports = function(req, res, next) {
    res.sendFile(`${__dirname}/result.pdf`)
} 