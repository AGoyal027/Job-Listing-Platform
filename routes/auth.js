const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/user');

router.get('/', (req, res) => {
    res.status(200).send('Auth Route!');
})

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;