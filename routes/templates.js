let express = require('express');
let router = express.Router();
let templatesController = require('../controllers/templates/templates.controller')

router.get('/', templatesController)


module.exports = router;
