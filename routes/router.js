const router = require('express').Router();

const controller = require('../controller/function.js'); 


// adding the titles in users
router.get('/title', controller.title)

// posting titles
router.post('/title', controller.postTitle)

// page not found error route
router.use('/', controller.error);

module.exports = router;