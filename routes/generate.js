const express = require('express')
const router = express.Router();



// GENERATE PDF REQUEST.
router.post('/pdf', require('../controllers/generate/pdf.controller'));

// FETCH PDF
router.post('/fetch', require('./../controllers/generate/fetch.controller'))

module.exports = router;