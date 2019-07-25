const router = require('express').Router();

const controller = require('../controller/function.js'); 


// adding the titles in users
router.get('/title', controller.title)


// page not found error route
router.use('/', controller.error);

module.exports = router;