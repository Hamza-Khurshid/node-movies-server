var app = require('express').Router();
var multer = require("multer");
var userCollection = require('../models/userSchema');
var generateAuthToken = require('../services/token');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+file.originalname)
  }
}) 
var upload = multer({ storage: storage })

app.post("/register", function(req, res) {
  userCollection
    .find({ email: req.body.email })
    .exec(function (err, response) {
        if (err) {
          res.statusCode = 500;
          return res.send({ err, status: false, message: 'Something went wrong on server.' })
        }

        if(response?.length) {
          res.statusCode = 422;
          return res.send({ status: false, message: 'User already exists with same email address.' })
        }

    let user = new userCollection({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      // profile: req.file.path.slice(8),
    });
    
    user
      .save((err, user) => {
        if (err) {
          res.statusCode = 500;
          return res.send({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
  
        res.send({ user, status: true, message: 'User registered successfully.' })
      });
    });
})

app.post('/login', (req, res) => {
  userCollection
    .findOne({ email: req.body.email, password: req.body.password })
    .exec(function (err, user) {
        if (err) {
          return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        
        if(user) {
          res.json({ user, token: generateAuthToken(user), status: true })
        } else {
          res.statusCode = 401;
          res.json({ status: false, message: 'Incorrect credentials.' })
        }
      });
})

module.exports = app;