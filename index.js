const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const app = express();

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flag: 'a'
});

const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
    flag: 'a'
});

const authRoutes = require('./routes/auth')
const jobRoutes = require('./routes/job')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleTimeString()}`;
    const log = `${req.method} ${req.originalUrl} ${time}`;
    logStream.write(log + "\n");
    next();
})

app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);

app.get('/', (req, res) => {
    res.send('Hello World').status(200);
})

app.use((err, req, res, next) => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + err.stack + "\n");
    res.status(500).send('Internal Server Error')
})

app.use((req, res, next) => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const error = `${req.method} ${req.originalUrl} ${time}`;
    errorStream.write(error + "\n");
    res.status(404).send('Route not found')
})

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Db connected"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('Server is up :)');
})