const express = require('express');
const connection = require('../config/database');
const { addNewMovie, readMovies, readMovieWithId, updateMovieWithId } = require('../controllers/apiController');
const router = express.Router()

//Routes
//CREATE
router.post('/add-new-movie', addNewMovie);

//READ
router.get('/read-movies', readMovies);
router.get('/movies/movie/:movieId', readMovieWithId);

//UPDATE
router.put('/movie/update/:movieId', updateMovieWithId);

//DELETE

module.exports = router