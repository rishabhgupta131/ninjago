const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/ninjago');
mongoose.Promise = global.Promise;

//To fetch all the static things from a particular folder(in this case 'public' folder)
app.use(express.static('public'));

//Parsing the incoming data in case of post request. It always needs to be done before the routes is called.
app.use(bodyParser.json());

// If we are not using routes anywhere else, then we could also use app.use('/api',require('./routes/api')).
app.use('/api',routes);

//error handling middleware
app.use(function(err,req,res,next){
	res.status(422).send({Error: err.message})
})

app.listen(process.env.port||4000,function(){
	console.log("Now listening to port 4000...");
})