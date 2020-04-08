var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Task = require('./api/models/todoListModel');
var routes = require('./api/routes/todoListRoutes');
var app = express();
var port = process.env.PORT || 3000;

// mongoose instance connection url
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TodoDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// bodyParser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes config
routes(app); // register the routes

// tell the server to listen on this port
app.listen(port);

console.log("Todo list RESTful API server started on port " + port);