import express from 'express';
import { addMovie, getMovie } from '../controllers/movieList.controlller.js';
import {verifyToken}  from "../utils/verifyUser.js"

const router= express.Router();


router.post("/add-movie", verifyToken, addMovie);
router.get("/movies", getMovie)

export default router; 