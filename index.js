// index.js

/**
 * Required External Modules
 */

const https = require('https');
const fs = require('fs');
const app = require("express");
const path = require("path");

/**
 * App Variables
 */

const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

/**
 * Server Activation
 */

https.createServer({
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem'),
	passphrase: '8uluB0l@'
}, app)
.listen(port);
