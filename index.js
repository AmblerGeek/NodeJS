require('dotenv').config();

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./src/config/config');
// const router = require('./src/routes/router');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// app.use(router);

const tours_data = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);
const tours = JSON.parse(tours_data);

app.get('/api/v1/tours', (request, response) => {

    response
    .status(200)
    .json({
        status: 'success',
        data: {
            tours
        }
    });
});

app.post('/api/v1/tours', (request, response) => {
    console.log(request.body);
    response
    .status(200)
    .send("POST");
});


/*
app.get('/', (request, response) => {
    response
    .status(200)
    .json({
        message: "Hello World!",
        app: "NodeJS"
        });
});

app.post('/', (request, response) => {
    response
    .send("Post end-point");
});
*/

const port = config.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});