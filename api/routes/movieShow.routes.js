import express from 'express';
import { addMovieShow, getMovieShow } from '../controllers/movieShow.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router= express.Router();

router.post("add-movie-show", verifyToken, addMovieShow);
router.get('/movies-show', getMovieShow);




export default router;