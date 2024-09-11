import "../models/movieShow.model.js"
import Show from "../models/movieShow.model.js";

export const addMovieShow= async(req,res)=>{
const {adminId, movieName, date, time, price, seat}= req.body;
const newMovie= new Show({adminId, movieName, date, time, price, seat});

try{
    await newMovie.save();
    res.status(201).send({message: "New Show added successfully."})
}catch(error){
    res.send(500).send({ message: "An error occurred while adding the new show in theater. Please try again later. " + error })
}
}

export const getMovieShow= async(req, res)=>{
    const allShow= await Show.find();
    res.status(201).send(allShow);
}