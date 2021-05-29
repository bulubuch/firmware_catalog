const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const appSettings = require('./config/app-settings');
require('dotenv').config();

const app = express();
const port = process.env.PORT || appSettings.server_listen_port;

// let hbs = exphbs.create({
// 	helpers: {
// 		table: function 
// 	}
// })
// Parsing middleware
// Parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parsing application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('assets'))

// Templating Engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Routes
app.use('/', routes);

// Start server
const server = app.listen(port, () => {
  console.log(`Express is running on port ${server.address().port}`);
});