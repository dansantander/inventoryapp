#! /usr/bin/env node

console.log('This script populates Inventory App DB');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Movie = require('./models/movie')
var Genre = require('./models/genre')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var movies = []
var genres = []


function genreCreate(name, description, cb) {
  var genre = new Genre({ name: name, description: description });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  });
}

function movieCreate(title, description, price, inStock, genre, cb) {
  // defining this without var, const or let
  // creates a global variable
  moviedetail = {
    title: title,
    description: description,
    price: price,
    inStock: inStock,
    genre: genre,
  }

  var movie = new Movie(moviedetail);
       
  movie.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Movie: ' + movie);
    movies.push(movie)
    cb(null, movie)
  }  );
}


function createGenres(cb) {
    async.series([
        function(callback) {
          genreCreate("Fantasy", "Some random description about Fantasy genre", callback);
        },
        function(callback) {
          genreCreate("Science Fiction", "Some random description about Science Fiction genre", callback);
        },
        function(callback) {
          genreCreate("French Poetry", "Some random description about French Poetry genre", callback);
        },
      ],
        // optional callback
    cb);
}

function createMovies(cb) {
    async.parallel([
        function(callback) {
          movieCreate('Movie 1', 'Summary of movie 1', 12.99, 7, genres[2], callback);
        },
        function(callback) {
          movieCreate('Movie 2', 'Summary of movie 2', 14.99, 10, genres[1], callback);
        },
        function(callback) {
          movieCreate('Movie 3', 'Summary of movie 3', 11.54, 3, genres[0], callback);
        },

    ],
        // optional callback
    cb);
}

async.series([
    createGenres,
    createMovies
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Movie Instances: '+movies);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

