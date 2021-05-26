const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use(express.static('assets'))
app.use('/', routes);
module.exports = app;