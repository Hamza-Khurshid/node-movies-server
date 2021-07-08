//import nodemodule
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

//import from custom files
var dbConnection = require ('./config/dbConnection');
var userRoutes = require('./routes/users');
var movieRoutes = require('./routes/movies');

//add middleware
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'))

//db connection
dbConnection();

// routes
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);

app.get('/', (req, res) => {
  res.send("Server running...")
})

app.listen(8080, function() {
  console.log("express server running on port 8080");
});