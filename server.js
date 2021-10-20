var express = require('express');
var app = express();
app.use(express.static('dist/X691Website'));
app.get('/', function (req, res,next) {
    res.redirect('/');
});
app.listen(8080)
