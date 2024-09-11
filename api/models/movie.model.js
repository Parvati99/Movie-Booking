import mongoose from "mongoose";

const movieSchema= new mongoose.Schema({
adminId:{
    type:String,
    require:true,
},
movieName:{
    type:String,
    require:true,
    unique:true,
},
moviePoster:{
    type:String,
    require:true,
},

}, {timestamp: true})

const Movie= mongoose.model("Movie", movieSchema);

export default Movie;