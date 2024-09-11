import Movie from '../models/movie.model.js'

export const addMovie= async(req, res)=>{
    const {adminId, movieName, moviePoster} =req.body;
    const newMovie= new Movie({adminId, movieName, moviePoster});
    try{
      await newMovie.save();
      res.status(201).send({message: "New Movie addedd successfully."})
    }catch(error){
        res.status(500).send({ message: "An error occurred while adding the new Movie. Please try again later. " + error }); 
    }
    // console.log("working")
}

export const getMovie= async(req, res)=>{
    const allMovie= await Movie.find();
    res.status(201).send(allMovie);
}