var Movie = require('../models/movie');
var Genre = require('../models/genre');

var async = require('async');

exports.index = function(req, res) {
  async.parallel({
      movie_count: function(callback) {
          Movie.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      genre_count: function(callback) {
        Movie.countDocuments({}, callback);
      }
  }, function(err, results) {
      res.render('index', { title: 'Movie Site Home', error: err, data: results });
  });
};

// Display list of all Movies.
exports.movie_list = function(req, res) {
  
  Movie.find({}, 'title')
  .populate('genre')
  .exec(function (err, list_movies) {
    if (err) { return next(err); }
    res.render('movie_list', { title: 'Movie List', movie_list: list_movies})
  })
};

// Display detail page for a specific Movie.
exports.movie_detail = function(req, res, next) {

  Movie.findById(req.params.id)
    .populate('genre')
    .exec(function (err, movie_detail ) {
      if (err) { return next(err); }
      if (movie_detail==null) { // No results.
        var err = new Error('Movie copy not found');
        err.status = 404;
        return next(err);
      }
      res.render('movie_detail', { movie:  movie_detail});
    });

};

// Display Movie create form on GET.
exports.movie_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Movie create GET');
};

// Handle Movie create on POST.
exports.movie_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Movie create POST');
};

// Display Movie delete form on GET.
exports.movie_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Movie delete GET');
};

// Handle Movie delete on POST.
exports.movie_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Movie delete POST');
};

// Display Movie update form on GET.
exports.movie_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Movie update GET');
};

// Handle Movie update on POST.
exports.movie_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Movie update POST');
};