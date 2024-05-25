const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Auth Route!');
})

router.post('/register', (req, res) => {
    res.status(200).send('Register Route!')
})

module.exports = router;