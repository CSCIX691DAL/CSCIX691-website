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
server.use(express.urlencoded({ extended: true }));
server.use("/", api);

server.listen(3000, () => {
  console.log("server is up at 3000")
});
