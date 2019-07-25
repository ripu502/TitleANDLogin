const router = require('express').Router();

const controller = require('../controller/function.js'); 


// page not found error route
router.use('/', controller.error);

module.exports = router;