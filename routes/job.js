const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById } = require('../controllers/job')
const { verifyAuth } = require('../middleware/verifyAuth');

router.get('/', (req, res) => {
    res.status(200).send('Job Route!');
})

router.post('/create', verifyAuth, createJob);

router.get('/all', getAllJobs);

router.get('/view/:jobnumber', getJobById);

module.exports = router;