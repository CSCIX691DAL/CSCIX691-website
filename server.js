var express = require('express');
var server = express();
var rateLimit = require("express-rate-limit");

server.use(
  rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 1 hour duration in milliseconds
    max: 100,
    message: JSON.stringify({"result": false, "cause": "too many request: 100/h"}),
    headers: true,
  })
);

//session
// const session = require('express-session');

const api = require("./node_src/Routers/index");
const {response} = require("express");

// //60min
// server.use(session({
//   name: 'identityKey',
//   secret: 'secretKey',
//   saveUninitialized: false,
//   resave: false,
//   cookie: {
//     maxAge: 60 * 60 * 1000
//   }
// }));

server.use(express.json());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use("/", api);

server.listen(8080, () => {
  console.log("server is up at 8080")
});
