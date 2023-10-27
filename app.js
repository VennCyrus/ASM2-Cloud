
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');

const router = express.Router();
var routes = require('./routes/controller');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views');

// Website routes
app.use('/', routes);

//Connect MongoBD Atlas
const conn_str = 'mongodb+srv://dnd28061412:dnd28061412@cluster0.iborcx9.mongodb.net/test' 
mongoose.connect(
    conn_str,
    { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },(err) => {
    if (err) {
    console.log("Error in connection");
    } else {
    console.log("Mongodb is connected");
    }});

const port = process.env.port || 3000;
app.listen(port);
console.log('Web Server is listening at port ' + port);

module.exports = router;

