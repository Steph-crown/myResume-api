const express = require('express');
const router = express.Router();



// SIGN UP POST REQUEST.
router.post('/signup', require('./../controllers/user/signup.controller'));

// LOG IN POST REQUEST
router.post('/login', require('./../controllers/user/login.controller'));

// LOG IN DIRECTLY FROM HOME PAGE (keep me signed in)
router.post('/login-direct', require('./../controllers/user/login-direct.controller'))

// SAVE PROFILE
router.post('/update-dashboard', require('./../controllers/user/update-dashboard.controller'));

// RECOVER PASSWORD 
router.post('/recover-password', require('./../controllers/user/recover-password.controller'));

// DELETE USER
router.post('/delete-user', require('../controllers/user/delete-user.controller'));

// CHANGE PASSWORD
router.post('/change-password', require('../controllers/user/change-password.controller'))


module.exports = router;
