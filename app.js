const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');

const orderRoutes = require('./api/routes/order');

const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://' + process.env.MONGO_DB_US + ':' + process.env.MONGO_DB_PW + '@ds123012.mlab.com:23012/insyncproject', {
    useCreateIndex: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use('/uploads',express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
