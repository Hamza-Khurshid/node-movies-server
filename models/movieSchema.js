var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Movie = new Schema({
    title: String,
    image: String,
    rating: String,
});
const movieCollection = mongoose.model("movies", Movie);

module.exports = movieCollection;