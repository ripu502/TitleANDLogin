const router = require('express').Router();

const controller = require('../controller/function.js');
const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');



// adding the titles in users
router.get('/title', ensureAuthenticated, controller.title)

router.get('/register', forwardAuthenticated, controller.register);

router.post('/register', controller.postRegister);

router.get('/login', forwardAuthenticated, controller.login);

router.post('/login', controller.postLogin);

router.get('/logout', ensureAuthenticated, controller.logout)

// posting titles
router.post('/title', controller.postTitle)

// page not found error route
router.use('/', controller.error);

module.exports = router;