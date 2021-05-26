const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

// Parsing middleware
// Parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parsing application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('assets'))

// Templating Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Routes
app.get('/', (res, req) => {
	res.render('home');
});

// Start server
const server = app.listen(port, () => {
  console.log(`Express is running on port ${server.address().port}`);
});