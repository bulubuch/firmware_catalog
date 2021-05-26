
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //get the token from the header if present
  console.log("Token Authtification");
  // var token = req.headers["x-access-token"] || req.headers["authorization"];
  // //if no token found, return response (without going to the next middelware)
  // if (!token) return res.status(401).send("Access denied. No token provided.");
  // console.log("Token found");
  // if (token.indexOf("Bearer ")> -1)
  //   token = token.slice(7);
  // console.log(token);

  // try {
  // console.log(token);
  // //if can verify the token, set req.user and pass to next middleware
  //   const decoded = jwt.verify(token, config.get("myprivatekey"));
  //   req.user = decoded;
  //   console.log("Token VALID");
    next();
  // } catch (ex) {
  //   //if invalid token
  //   console.log("Token Invalid");
  // console.log(token);
  //   res.status(400).send("Invalid token.");
  // }
};