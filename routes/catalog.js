var express = require('express');
var router = express.Router();

var movie_controller = require('../controllers/movieController');
var genre_controller = require('../controllers/genreController');

///++++++ MOVIE ROUTES ++++++///

// GET catalog home page.
router.get('/', movie_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', movie_controller.movie_create_get);

// POST request for creating Book.
router.post('/book/create', movie_controller.movie_create_post);

// GET request to delete Book.
router.get('/book/:id/delete', movie_controller.movie_delete_get);

// POST request to delete Book.
router.post('/book/:id/delete', movie_controller.movie_delete_post);

// GET request to update Book.
router.get('/book/:id/update', movie_controller.movie_update_get);

// POST request to update Book.
router.post('/book/:id/update', movie_controller.movie_update_post);

// GET request for one Book.
router.get('/book/:id', movie_controller.movie_detail);

// GET request for list of all Book items.
router.get('/books', movie_controller.movie_list);

///++++++ GENRE ROUTES ++++++///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

module.exports = router;