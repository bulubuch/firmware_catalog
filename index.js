// import required packages
const express = require('express');
const cors = require('cors');

const https = require('https');
const http = require('http');

const fs = require('fs');

// create new express app and save it as "app"
const app = express();
app.use(cors());

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello dev.to!');
});

// another route
app.get('/firmware', (req, res) => {
  res.send('');
});

// serve public folder
app.use(express.static('public'))

// Listen both http & https ports
const httpServer = http.createServer(app);
// const httpsServer = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
// }, app);

httpServer.listen(8000, () => {
    console.log('HTTP Server running on port 8000');
});

// httpsServer.listen(443, () => {
//     console.log('HTTPS Server running on port 443');
// });