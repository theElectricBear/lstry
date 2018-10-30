const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Express route handlers

require('./server-util/auth-routes')(app, express, keys);
require('./server-util/api-routes')(app, keys);

app.get('/hello', (req, res) => {
  res.send('Hi');
});

app.listen(5000, err => {
  console.log('Listening');
});
