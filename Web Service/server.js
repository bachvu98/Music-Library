var express = require('express'), //needed for creating WEB API routes
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Song = require('./api/Model'), //created model loading here
    Album = require('./api/Model'), //created model loading here
    bodyParser = require('body-parser'); //needed to parse incoming request parameters

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/musicDB',{ useMongoClient: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/Routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});