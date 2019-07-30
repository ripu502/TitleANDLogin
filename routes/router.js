const router = require('express').Router();
const controller = require('../controller/function.js');
const User = require('../models/User');
const { check } = require('express-validator');
// if authenticated check
const { forwardAuthenticated } = require('../config/auth');
// ensure authenticated check
const { ensureAuthenticated } = require('../config/auth');

// getting titles of loged user
router.get('/', ensureAuthenticated, controller.dashboard)

// getting the login page if logout
router.get('/login', forwardAuthenticated, controller.login);

// posting the login details for the authentication
router.post('/login', controller.postLogin);

// getting the register page if logout
router.get('/register', forwardAuthenticated, controller.register);

// posting the registration details for the register of the user
router.post('/register',
    [check('email').isLength({ min: 1 }).withMessage('empty')
        .custom((value) => {
            return User.findOne({
                where: {
                    email: value
                }
            })
                .then((user) => {
                    if (user)
                        return Promise.reject('User already exist');
                })
        }),

    check('password').isLength({ min: 1 }).withMessage('empty'),
    check('cpassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Password confirmation does not match password');
        else
            return true;
    })], controller.postRegister);

// get request to logout the user
router.get('/logout', ensureAuthenticated, controller.logout)

// adding the titles page if the user is logIn
router.get('/title', ensureAuthenticated, controller.title)

// posting titles in the mongoCloud if the user is logIn
router.post('/title', controller.postTitle)

// page not found error route
router.use('/', controller.error);

module.exports = router;