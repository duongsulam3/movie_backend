const express = require('express');
const connection = require('../config/database');
const { addNewMovie, readMovies, readMovieWithId, updateMovieWithId, addNewEpisodeWithMovieId, deleteEpisode, deleteMovie, readEpisodesOfAMovie, updateEpisode } = require('../controllers/apiController');
const router = express.Router()

//Routes
/*--------------------------------------------------------------------------------*/
/*---------------------------------MOVIE------------------------------------------*/
//CREATE
router.post('/movies/movie/create', addNewMovie);
//READ
router.get('/movies/read/all-and-total-episodes', readMovies);
router.get('/movies/movie/:movieId', readMovieWithId);

//UPDATE
router.put('/movies/movie/update/:movieId', updateMovieWithId);
//DELETE
router.delete('/movies/movie/delete/:movieId', deleteMovie);
/*--------------------------------------------------------------------------------*/
/*---------------------------------EPISODE----------------------------------------*/
//CREATE
router.post('/movie/:movieId/episode/create', addNewEpisodeWithMovieId);
//READ
router.get('/movie/:movieId/read/episodes', readEpisodesOfAMovie);
//UPDATE
router.put('/movie/:movieId/update/episode/:episode', updateEpisode);
//DELETE
router.delete('/movie/:movieId/delete/episode/:episode', deleteEpisode);

module.exports = router