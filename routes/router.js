const router = require('express').Router();
const controller = require('../controller/function.js');
// if authenticated check
const { forwardAuthenticated } = require('../config/auth');
// ensure authenticated check
const { ensureAuthenticated } = require('../config/auth');

// getting the login page if logout
router.get('/login', forwardAuthenticated, controller.login);

// posting the login details for the authentication
router.post('/login', controller.postLogin);

// getting the register page if logout
router.get('/register', forwardAuthenticated, controller.register);

// posting the registration details for the register of the user
router.post('/register', controller.postRegister);

// get request to logout the user
router.get('/logout', ensureAuthenticated, controller.logout)

// adding the titles page if the user is logIn
router.get('/title', ensureAuthenticated, controller.title)

// posting titles in the mongoCloud if the user is logIn
router.post('/title', controller.postTitle)

// page not found error route
router.use('/', controller.error);

module.exports = router;