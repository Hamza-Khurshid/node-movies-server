var app = require('express').Router();
var multer = require("multer");
var movieCollection = require('../models/movieSchema');
var findByToken = require('../middlewares/verifytoken');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+file.originalname)
  }
})
 
var upload = multer({ storage })


app.post('/', findByToken, (req, res) => {
  movieCollection
    .findById(req.body._id)
    .exec(function (err, response) {
        if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ movie: response, status: true })
    });
})

app.post('/delete', findByToken, (req, res) => {
  movieCollection
    .findOneAndDelete({_id: req.body._id})
    .exec(function (err, response) {
        if (err) {
          return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ movie: response, status: true, message: 'Movie deleted successfully.' })
    });
})

app.post('/update', findByToken, (req, res) => {
  movieCollection
    .findOneAndUpdate(
      {_id: req.body._id},
      {
        title: req.body.title,
        rating: req.body.rating,
      }, {new: true})
    .exec(function (err, response) {
        if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ movie: response, status: true, message: 'Movie updated successfully.' })
    });
})

app.post("/create", findByToken, upload.single('image'), function(req, res) {
  let post = new movieCollection({
    title: req.body.title,
    image: req.file.path.slice(8),
    rating: req.body.rating,
  });
  
  post
    .save((err, response) => {
      if (err) {
        return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
      }

      res.json({ movie: response, status: true })
    });
})

app.get("/list", findByToken, function(req, res) {
    movieCollection
      .find()
      .exec((err, data) => {
          if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' });
          } else {
            res.json({ movies: data, status: true });
          }
      });
  })  


module.exports = app;