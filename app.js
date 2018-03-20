const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let ecom = require('./api/ecomexpress.js');
let ekart = require('./api/ekart.js');
let delhivery = require('./api/delhivery.js');
let xpressbees = require('./api/xpressbees.js');
let bluedart = require('./api/bluedart.js');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/ecom-express', ecom)
app.use('/ekart', ekart)
app.use('/delhivery', delhivery)
app.use('/xpressbees', xpressbees)
app.use('/bluedart', bluedart)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app