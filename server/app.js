const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

mongoose.connect('mongodb://${process.env.USER}:${process.env.PW}@ds033469.mlab.com:33469/heroku_s0xsg8q1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
})

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;
