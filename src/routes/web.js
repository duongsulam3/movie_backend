const express = require('express')
const { getHelloWorld, getTest } = require('../controllers/webController')
const router = express.Router()

//Routes
router.get('/helloworld', getHelloWorld);

router.get('/test', getTest);

module.exports = router