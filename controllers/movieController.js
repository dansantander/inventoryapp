var Movie = require('../models/movie');
var Genre = require('../models/genre');
var async = require('async');
const { body, validationResult } = require("express-validator");

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
exports.movie_create_get = function(req, res, next) {
  Genre.find({}, 'name')
  .exec(function(err, genres) {
    if (err) { return next(err); }
    res.render('movie_form', { title: 'Create Movie', genres: genres });
  })
};

// Handle Movie create on POST.
exports.movie_create_post = [

  // Convert the genre to an array.
  (req, res, next) => {
    if(!(req.body.genre instanceof Array)){
        if(typeof req.body.genre ==='undefined')
        req.body.genre = [];
        else
        req.body.genre = new Array(req.body.genre);
    }
    next();
  },

  // Validate and sanitise fields.
  body('title').isLength({ min: 1}).escape(),
  body('description').isLength({ min: 1}).escape().withMessage('Description must be specified.'),
  body('price').isLength({ min: 1}).escape(),
  body('inStock').isLength({ min: 1}).escape(),
  body('genre.*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    var movie = new Movie(
    { title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
      genre: req.body.genre
     });


    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      Genre.find({}, 'name')
      .exec(function(err, genres) {
        if (err) { return next(err); }

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
              results.genres[i].checked='true';
          }
        }

        res.render('movie_form', { title: 'Create Movie', genres: genres, errors: errors.array() });

      })
      return;
    } else {

      // Data from form is valid. Save book.
      movie.save(function (err) {
        if (err) { return next(err); }
           //successful - redirect to new book record.
           res.redirect(movie.url);
        });
    }

  }
]

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