var express = require('express');
var server = express();

//session
const session = require('express-session');

const api = require("./node_src/Routers/index");
const {response} = require("express");

//60min
server.use(session({
  name: 'identityKey',
  secret: 'secretKey',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));

server.use(express.json());
server.use("/", api);

server.listen(8080, () => {
  console.log("server is up at 8080")
});
