const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

const app = express();

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flag: 'a'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const now = new Date();
    const time = `${now.toLocaleTimeString()}`;
    const log = `${req.method} ${req.originalUrl} ${time}`;
    logStream.write(log + "\n");
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World').status(200);
})

app.listen(3000, () => {
    console.log('Server is up :)');
})