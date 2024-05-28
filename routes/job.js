const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', (req, res) => {
    res.status(200).send('Job Route!');
})

router.post('/create', verifyAuth, (req, res) => {
    res.status(200).send('Created job route');
})

module.exports = router;