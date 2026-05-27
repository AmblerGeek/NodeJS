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

const getAllTours = (request, response) => {
    response
    .status(200)
    .json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (request, response) => {
    const id = Number(request.params.id);
    const tour = tours.find(element => element.id == id);

    if(tour) {
        response
        .status(200)
        .json({
            status: 'success',
            data: {
                tour
            }
        });
    } else {
        response.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
};

const createTour = (request, response) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId,}, request.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {
        response.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

const updateTour = (request, response) => {
    const id = Number(request.params.id);
    const tour = tours.find(element => element.id == id);
    if(tour) {
        response
        .status(200)
        .json({
            status: 'success',
            data: {
                tour: 'Updated Tour'
            }
        });
    } else {
        response.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour);

const port = config.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});